// lib/db.js
import { MongoClient } from 'mongodb';

let client;
let clientPromise;

//const uri = process.env.MONGODB_URI;  // Ensure you have the MongoDB URI in your environment variables
const uri = 'mongodb://localhost:27017/2FA'
const dbName = '2FA';

if (!clientPromise) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

export async function getLogsCollection() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return db.collection('logs');
}
