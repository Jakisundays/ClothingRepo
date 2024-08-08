import { NextRequest } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

type ItemInput = {
  id: number;
  name: string;
  description: string;
  price: string;
  images: { id: string; name: string; url: string }[];
  inventory: number;
  quantity: number;
  size: string;
};

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP!,
});

function transformToItems(cart: ItemInput[]) {
  return cart.map((item) => ({
    id: item.id.toString(), // Convert id to string
    title: item.description, // Use name as title
    description: item.name, // Use description as description
    picture_url: item.images.length > 0 ? item.images[0].url : undefined, // Use the first image's URL if available
    category_id: item.size,
    quantity: item.quantity, // Use quantity from cart
    currency_id: "ARS", // Assuming ARS as currency
    unit_price: parseFloat(item.price), // Convert price to number
  }));
}

export async function POST(request: NextRequest) {
  const { data, cart } = await request.json();
  const transformedItems = transformToItems(cart);

  const preference = new Preference(client);
  const preferenceInfo = await preference.create({
    body: {
      items: transformedItems,
      auto_return: "all",
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL!}/order/success`,
        failure: process.env.NEXT_PUBLIC_APP_URL!,
        pending: process.env.NEXT_PUBLIC_APP_URL!,
      },
      notification_url: `${process.env
        .NEXT_PUBLIC_APP_URL!}/api/payment/webhook`,
      metadata: data,
      payer: {
        name: data.firstName,
        surname: data.lastName,
        email: data.email,
        phone: {
          number: data.phone,
        },
        address: { zip_code: data.postalCode, street_name: data.address },
      },
    },
  });

  console.log({ preferenceInfo });

  //   return "cool";
  return new Response(JSON.stringify(preferenceInfo));
}
