import { NextRequest } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_MP!,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  const payment = new Payment(client);
  const paymentInfo = await payment.get({ id: orderId });

  if (!paymentInfo) {
    return new Response("failed", { status: 400 });
  }

  const data = {
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
    products: paymentInfo.additional_info?.items,
    totalAmountPaid: paymentInfo.transaction_details?.total_paid_amount,
    date_approved: paymentInfo.date_approved,
    status: paymentInfo.status,
  };
  return new Response(JSON.stringify(data));
}
