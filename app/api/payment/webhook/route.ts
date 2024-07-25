import { NextRequest } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { Resend } from "resend";
import OrderReceipt from "@/emails/OrderReceipt";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP!,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Webhook:", body);
  // Webhook: {
  //   action: 'payment.updated',
  //   api_version: 'v1',
  //   data: { id: '123456' },
  //   date_created: '2021-11-01T02:02:02Z',
  //   id: '123456',
  //   live_mode: false,
  //   type: 'payment',
  //   user_id: 606875432
  // }
  const payment = new Payment(client);
  const paymentInfo = await payment.get({ id: "82696757426" });
  // const paymentInfo = await payment.get({ id: body.data.id });
  console.log({
    item: paymentInfo.additional_info?.items,
    date: paymentInfo.date_approved,
    total: paymentInfo.transaction_details?.total_paid_amount,
  });

  // item: [
  //   {
  //     category_id: null,
  //     description: 'La Varsity Retro te lleva de vuelta al estilo clásico con un giro moderno. Azul brillante y gráficos audaces, unisex y versátil.',
  //     id: '1',
  //     picture_url: 'https://http2.mlstatic.com/D_NQ_NP_955035-MLA77442051770_072024-F.jpg',
  //     quantity: '2',
  //     title: 'Varsity Retro',
  //     unit_price: '1'
  //   }
  // ],
  // date: '2024-07-12T17:33:18.000-04:00'

  // {
  //   paymentInfo: {
  //     accounts_info: null,
  //     acquirer_reconciliation: [],
  //     additional_info: {
  //       authentication_code: null,
  //       available_balance: null,
  //       ip_address: '190.194.224.45',
  //       items: [Array],
  //       nsu_processadora: null,
  //       payer: [Object]
  //     },
  //     authorization_code: null,
  //     binary_mode: false,
  //     brand_id: null,
  //     build_version: '3.60.1-hotfix-3',
  //     call_for_authorize_id: null,
  //     captured: true,
  //     card: {},
  //     charges_details: [ [Object] ],
  //     collector_id: 606875432,
  //     corporation_id: null,
  //     counter_currency: null,
  //     coupon_amount: 0,
  //     currency_id: 'ARS',
  //     date_approved: '2024-07-12T17:33:18.000-04:00',
  //     date_created: '2024-07-12T17:33:17.000-04:00',
  //     date_last_updated: '2024-07-12T17:33:21.000-04:00',
  //     date_of_expiration: null,
  //     deduction_schema: null,
  //     description: 'Varsity Retro',
  //     differential_pricing_id: null,
  //     external_reference: null,
  //     fee_details: [ [Object] ],
  //     financing_group: null,
  //     id: 82696757426,
  //     installments: 1,
  //     integrator_id: null,
  //     issuer_id: '2005',
  //     live_mode: true,
  //     marketplace_owner: null,
  //     merchant_account_id: null,
  //     merchant_number: null,
  //     metadata: {
  //       address: 'palermo 1234',
  //       province: 'Buenos Aires',
  //       phone: '1234567890',
  //       last_name: 'Dom',
  //       postal_code: 'b7400',
  //       first_name: 'Jacob',
  //       apartment: '2w',
  //       email: 'jacob@gmail.com'
  //     },
  //     money_release_date: '2024-07-30T17:33:18.000-04:00',
  //     money_release_schema: null,
  //     money_release_status: 'pending',
  //     notification_url: null,
  //     operation_type: 'regular_payment',
  //     order: { id: '20721373513', type: 'mercadopago' },
  //     payer: {
  //       email: 'santiagoromero4226@gmail.com',
  //       entity_type: null,
  //       first_name: null,
  //       id: '268351478',
  //       identification: [Object],
  //       last_name: null,
  //       operator_id: null,
  //       phone: [Object],
  //       type: null
  //     },
  //     payment_method: { id: 'account_money', issuer_id: '2005', type: 'account_money' },
  //     payment_method_id: 'account_money',
  //     payment_type_id: 'account_money',
  //     platform_id: null,
  //     point_of_interaction: {
  //       business_info: [Object],
  //       location: [Object],
  //       transaction_data: [Object],
  //       type: 'CHECKOUT'
  //     },
  //     pos_id: null,
  //     processing_mode: 'aggregator',
  //     refunds: [],
  //     release_info: null,
  //     shipping_amount: 0,
  //     sponsor_id: null,
  //     statement_descriptor: null,
  //     status: 'approved',
  //     status_detail: 'accredited',
  //     store_id: null,
  //     tags: null,
  //     taxes_amount: 0,
  //     transaction_amount: 2,
  //     transaction_amount_refunded: 0,
  //     transaction_details: {
  //       acquirer_reference: null,
  //       external_resource_url: null,
  //       financial_institution: null,
  //       installment_amount: 0,
  //       net_received_amount: 1.92,
  //       overpaid_amount: 0,
  //       payable_deferral_period: null,
  //       payment_method_reference_id: null,
  //       total_paid_amount: 2
  //     },
  //     api_response: { status: 200, headers: [Object: null prototype] }
  //   }
  // }
  // const paymentInfo = await payment.get({ id: body.data.id });
  if (paymentInfo.status === "approved") {
    console.log({ metadata: paymentInfo.metadata });

    // metadata: {
    //   first_name: 'Jacob',
    //   last_name: 'Dom',
    //   email: 'jacob@gmail.com'
    //   phone: '1234567890',
    //   address: 'palermo 1234',
    //   province: 'Buenos Aires',
    //   postal_code: 'b7400',
    //   apartment: '2w',
    // }

    // const { data, error } = await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   to: ["delivered@resend.dev"],
    //   subject: "Hello world",
    //   react: OrderReceipt({
    //     id: body.data.id,
    //     clientDetails: {
    //       first_name: paymentInfo.metadata.first_name,
    //       last_name: paymentInfo.metadata.last_name,
    //       email: paymentInfo.metadata.email,
    //       phone: paymentInfo.metadata.phone,
    //       address: paymentInfo.metadata.address,
    //       province: paymentInfo.metadata.province,
    //       postal_code: paymentInfo.metadata.postal_code,
    //       apartment: paymentInfo.metadata.apartment,
    //     },
    //     products: paymentInfo.additional_info?.items,
    //     totalAmountPaid: paymentInfo.transaction_details?.total_paid_amount,
    //     date_approved: paymentInfo.date_approved,
    //   }),
    // });

    // if (error) {
    //   console.error({ error });
    //   // return res.status(400).json(error);
    // }

    // console.log({ data });
    // res.status(200).json(data);
  }
  return new Response("ok", { status: 200 });
}
