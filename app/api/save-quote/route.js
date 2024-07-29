// api/save-quote/route.js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// Handle POST request to save a new quote
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("quotes");

    const quoteData = await request.json();

    const result = await collection.insertOne(quoteData);

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving quote:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
