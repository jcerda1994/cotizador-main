// api/get-quote/route.js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// Handle GET request to retrieve a specific quote by ID
export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, message: "ID parameter is required." }),
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("quotes");
    const quote = await collection.findOne({ _id: new ObjectId(id) });

    if (!quote) {
      return new Response(
        JSON.stringify({ success: false, message: "Quote not found." }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: quote }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
