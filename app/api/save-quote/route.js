import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const calculateCost = (quoteData) => {
  const { containerType, weight, serviceType } = quoteData;
  let cost = 2000;

  cost += containerType === "contenedor" ? 5000 : 500;
  cost += weight > 1000 ? 1000 : 500;
  if (serviceType === "aereo") cost += 2000;
  else if (serviceType === "terrestre") cost += 1000;
  else if (serviceType === "maritimo") cost += 500;

  return cost;
};

export async function POST(req) {
  try {
    await client.connect();
    const database = client.db("cotizador");
    const collection = database.collection("quotes");

    // Asegúrate de que req.json() esté recibiendo datos correctamente
    const quoteData = await req.json();

    // Agrega un console.log para verificar el contenido de quoteData
    console.log("Received quote data:", quoteData);

    const totalCost = calculateCost(quoteData);

    const result = await collection.insertOne({ ...quoteData, totalCost });

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving quote:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
