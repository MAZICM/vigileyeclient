// pages/api/getOwnerName.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { cardID } = req.query;

  try {
    // Connect to MongoDB
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();

    const db = client.db('2FA'); // Assuming your database is named '2FA'
    const collection = db.collection('users'); // Assuming your collection is named 'users'

    // Query the database to find the card owner name based on the card ID
    const user = await collection.findOne({ cardID });

    if (user) {
      // If user found, return the owner name
      res.status(200).json({ ownerName: user.name });
    } else {
      // If user not found, return an error message
      res.status(404).json({ message: 'User not found' });
    }

    // Close the MongoDB connection
    await client.close();
  } catch (error) {
    console.error('Error fetching owner name:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
