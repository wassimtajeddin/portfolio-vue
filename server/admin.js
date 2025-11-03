const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://wassimtajeddin:${password}@cluster.vxwsnsd.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster`;

let db;
let client;

async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('portfolio');
    console.log('Connected to MongoDB for admin');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    return false;
  }
}

connectDB();

router.get('/messages', async (req, res) => {
  try {
    if (!db) {
      await connectDB();
    }

    const collection = db.collection('contact_messages');
    const messages = await collection.find().sort({ createdAt: -1 }).toArray();
    
    res.status(200).json({
      success: true,
      messages: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      msg: 'Failed to fetch messages'
    });
  }
});

router.put('/messages/:id/read', async (req, res) => {
  try {
    if (!db) {
      await connectDB();
    }

    const collection = db.collection('contact_messages');
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { read: true } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        msg: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      msg: 'Message marked as read'
    });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({
      success: false,
      msg: 'Failed to update message'
    });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    if (!db) {
      await connectDB();
    }

    const collection = db.collection('contact_messages');
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        msg: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      msg: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      msg: 'Failed to delete message'
    });
  }
});

module.exports = router;