import { NextRequest } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { Resend } from "resend";
import OrderReceipt from "@/emails/OrderReceipt";
import { NewOrder, NewPayment } from "@/db/schema";
import { insertOrder, insertPayment } from "@/db/insertOps";
import { getProductInventoryById } from "@/db/selectOps";
import { Items } from "mercadopago/dist/clients/commonTypes";
import updateProductInventory from "@/db/updateOps";
import { ProductInventory } from "@/types";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

const subtractProductQuantities = async (items: Items[]) => {
  // Loop through each item and update the inventory
  for (const item of items) {
    const { id, quantity, category_id } = item;

    // const quantityBought = parseInt(item.quantity, 10);

    // Fetch the current inventory for the product
    const product = await getProductInventoryById(Number(id));

    if (product && product.inventory) {
      const { inventory } = product;

      const inventoryItem = inventory.filter(
        (details) => details.size === category_id
      );

      if (inventoryItem) {
        // Subtract the quantity bought from the inventory
        let totalInventory = inventoryItem[0].quantity - quantity;
        // inventoryItem -= quantityBought;
        // Ensure the quantity does not go negative
        if (totalInventory < 0) {
          totalInventory = 0;
        }

        const newInventory: ProductInventory = {
          size: inventoryItem[0].size,
          quantity: totalInventory,
        };

        const updatedInventory = inventory.map((item) =>
          item.size === category_id ? newInventory : item
        );

        // Update the product inventory in the database
        await updateProductInventory(Number(id), updatedInventory);
      }
    }
  }
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const payment = new Payment(client);
  if (body.action === "payment.created") {
    console.log("Webhook:", body);

    try {
      const paymentInfo = await payment.get({ id: body.data.id });

      if (paymentInfo.status === "approved") {
        console.log({ items: paymentInfo.additional_info?.items });

        const newOrder: NewOrder = {
          items: paymentInfo.additional_info?.items ?? [],
        };

        const createdOrder = await insertOrder(newOrder);
        const orderId = createdOrder[0].id;

        const newPayment: NewPayment = {
          payment_id: paymentInfo.id?.toString() ?? "",
          ip_address: paymentInfo.additional_info?.ip_address ?? "",
          build_version: paymentInfo.build_version ?? "",
          captured: paymentInfo.captured ?? false,
          collector_id: paymentInfo.collector_id ?? 0,
          currency_id: paymentInfo.currency_id ?? "",
          date_approved: paymentInfo.date_approved ?? "",
          date_created: paymentInfo?.date_created ?? "",
          date_last_updated: paymentInfo?.date_last_updated ?? "",
          description: paymentInfo.description ?? "",
          payment_info_id: paymentInfo.order?.id?.toString() ?? "",
          installments: paymentInfo.installments ?? 0,
          issuer_id: paymentInfo.issuer_id ?? "",
          live_mode: paymentInfo.live_mode ?? false,
          metadata: paymentInfo.metadata ?? {},
          money_release_date: paymentInfo.money_release_date ?? "",
          money_release_status: paymentInfo.money_release_status ?? "",
          operation_type: paymentInfo.operation_type ?? "",
          order_id: orderId,
          order_type: paymentInfo.order?.type ?? "",
          payer_email: paymentInfo.payer?.email ?? "",
          payer_id: paymentInfo.payer?.id ?? "",
          payment_method_id: paymentInfo.payment_method?.id ?? "",
          payment_type_id: paymentInfo.payment_type_id ?? "",
          processing_mode: paymentInfo.processing_mode ?? "",
          status: paymentInfo.status ?? "",
          status_detail: paymentInfo.status_detail ?? "",
          transaction_amount: paymentInfo.transaction_amount ?? 0,
          transaction_amount_refunded:
            paymentInfo.transaction_amount_refunded ?? 0,
          net_received_amount:
            paymentInfo.transaction_details?.net_received_amount?.toString() ??
            "",
          total_paid_amount:
            paymentInfo.transaction_details?.total_paid_amount?.toString() ??
            "",
        };

        const paymentId = await insertPayment(newPayment);

        await subtractProductQuantities(paymentInfo.additional_info?.items!);

        const clientEmail = paymentInfo.metadata.email;

        const { error } = await resend.emails.send({
          from: "alterego4K <noreply@alterego4k.com.ar>",
          to: ["contact.tomasromero@gmail.com", clientEmail],
          subject: "Order Receipt",
          react: OrderReceipt({
            id: body.data.id,
            clientDetails: {
              first_name: paymentInfo.metadata.first_name,
              last_name: paymentInfo.metadata.last_name,
              email: paymentInfo.metadata.email,
              phone: paymentInfo.metadata.phone,
              address: paymentInfo.metadata.address,
              province: paymentInfo.metadata.province,
              postal_code: paymentInfo.metadata.postal_code,
              apartment: paymentInfo.metadata.apartment,
            },
            products: paymentInfo.additional_info?.items ?? [],
            totalAmountPaid:
              paymentInfo.transaction_details?.total_paid_amount!,
            date_approved: paymentInfo.date_approved!,
          }),
        });

        if (error) {
          console.error({ error });
          return new Response("Failed to send email", { status: 500 });
        }

        return new Response("Payment processed successfully", { status: 200 });
      } else {
        console.log("Payment not approved:", paymentInfo);
        return new Response("Payment not approved", { status: 200 });
      }
    } catch (error) {
      console.error("Failed to get payment info:", error);
      return new Response("Failed to get payment info", { status: 500 });
    }
  } else if (body.action === "payment.updated") {
    // const paymentInfo = await payment.get({ id: body.data.id });

    return new Response(null, { status: 204 });
  } else {
    console.log("Webhook:", body);
    return new Response(null, { status: 204 });
  }
}
