// api/get-all-quotes/route.js
import clientPromise from "../../../lib/mongodb";

// Handle GET request to retrieve all quotes
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("quotes");
    const quotes = await collection.find({}).toArray();

    return new Response(JSON.stringify({ success: true, data: quotes }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching all quotes:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
