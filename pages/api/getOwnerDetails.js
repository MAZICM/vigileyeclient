// pages/api/getOwnerDetails.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { cardID } = req.query;

  try {
    // Connect to MongoDB
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();

    // Access the "2FA" database and the "users" collection
    const db = client.db('2FA');
    const collection = db.collection('users');

    // Find the user with the given card ID
    const user = await collection.findOne({ cardID });

    if (user) {
      // If the user is found, send the user's name as the response
      res.status(200).json({ ownerName: user.name });
    } else {
      // If the user is not found, send a 404 Not Found response
      res.status(404).json({ error: 'User not found' });
    }

    // Close the MongoDB connection
    await client.close();
  } catch (error) {
    console.error('Error fetching owner details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
