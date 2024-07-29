const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://root:root@cluster0.qbkfnji.mongodb.net/cotizacion";

async function testConnection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("cotizacion");
    console.log("Connected successfully to MongoDB");

    // Test insertion
    const collection = db.collection("testCollection");
    const result = await collection.insertOne({ test: "data" });
    console.log("Insert result:", result);
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await client.close();
  }
}

testConnection();
