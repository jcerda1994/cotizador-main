import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db("cotizador");
    const collection = database.collection("quotes");

    const quotes = await collection.find({}).toArray();
    return new Response(JSON.stringify({ success: true, data: quotes }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting quotes:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
