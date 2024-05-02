// lib/mongodb.js
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const MONGODB_DB = process.env.MONGODB_DB || '2FA';

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to environment variables');
}

if (process.env.NODE_ENV === 'development') {
  // In development, reuse the same client for hot reloading
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  clientPromise = client.connect();
}

export default clientPromise;
