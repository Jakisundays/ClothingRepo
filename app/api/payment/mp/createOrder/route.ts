import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_MP!,
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log({ body });
  const payment = new Payment(client);
  const paymentInfo = await payment.get({ id: body.data.id });
  if (paymentInfo.status === "approved") {
    console.log({ metadata: paymentInfo.metadata });
  }
  return new Response("ok", { status: 200 });
}
