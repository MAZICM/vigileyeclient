import { getLogsCollection } from '../lib/lib';
import formidable from 'formidable';  // Used for parsing form data
import fs from 'fs';  // Used for handling file data

export const config = {
  api: {
    bodyParser: false,  // Disable Next.js default body parser
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(400).json({ error: 'Error parsing form' });
    }

    const { name, cardID } = fields;
    const image = files.image;

    if (!name || !cardID || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const imageBuffer = fs.readFileSync(image.filepath);  // Read image data

    try {
      const collection = await getLogsCollection();
      const newUser = {
        name,
        cardID,
        image_data: imageBuffer.toString('base64'),  // Store image as base64
        scan_time: new Date().toISOString(),
      };

      await collection.insertOne(newUser);  // Insert new user into MongoDB

      return res.status(200).json({ success: true, message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding user to MongoDB:', error);
      return res.status(500).json({ error: 'Error adding user to database' });
    }
  });
}
