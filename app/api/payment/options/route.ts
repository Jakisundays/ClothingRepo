import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log({ body });
    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Error parsing JSON or processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
