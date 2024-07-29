// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client = new MongoClient(uri);
let clientPromise = client.connect();

export default clientPromise;
