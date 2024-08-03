import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the URL from the request
    const url = new URL(request.url);

    // Extract query parameters
    const topic = url.searchParams.get("topic");
    const id = url.searchParams.get("id");

    // Log the entire request object (as per your initial code)
    console.log(request);

    // Log the extracted values
    console.log("Topic:", topic);
    console.log("ID:", id);

    // You can now use these values in your logic
    // For example, you might want to process the payment based on the topic and id

    // Return a response
    return NextResponse.json({
      message: "Received payment options request",
      topic: topic,
      id: id,
    });
  } catch (error) {
    console.error("Error processing request:", error);

    // Return an error response
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error,
      },
      { status: 500 }
    );
  }
}
