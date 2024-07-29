import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, message: "ID is required" }),
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const database = client.db("cotizador");
    const collection = database.collection("quotes");

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid ID format" }),
        { status: 400 }
      );
    }

    const quote = await collection.findOne({ _id: new ObjectId(id) });
    if (quote) {
      return new Response(JSON.stringify({ success: true, data: quote }), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Quote not found" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error getting quote:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
