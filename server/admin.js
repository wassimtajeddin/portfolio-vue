const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://wassimtajeddin:${password}@cluster.vxwsnsd.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster`;

let db;
let client;

async function connectDB() {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db('portfolio');
      console.log('Admin: Connected to MongoDB');
    }
    return db;
  } catch (error) {
    console.error('Admin: MongoDB connection failed:', error.message);
    throw error;
  }
}

connectDB().catch(console.error);

router.get('/messages', async (req, res) => {
  try {
    const database = await connectDB();
    const collection = database.collection('contact_messages');
    const messages = await collection.find().sort({ createdAt: -1 }).toArray();
    
    console.log(`Admin: Fetched ${messages.length} messages`);
    
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
    const database = await connectDB();
    const collection = database.collection('contact_messages');
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

    console.log(`Admin: Marked message ${req.params.id} as read`);
    
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

router.put('/messages/:id/unread', async (req, res) => {
  try {
    const database = await connectDB();
    const collection = database.collection('contact_messages');
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { read: false } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        msg: 'Message not found'
      });
    }

    console.log(`Admin: Marked message ${req.params.id} as unread`);
    
    res.status(200).json({
      success: true,
      msg: 'Message marked as unread'
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
    const database = await connectDB();
    const collection = database.collection('contact_messages');
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        msg: 'Message not found'
      });
    }

    console.log(`Admin: Deleted message ${req.params.id}`);
    
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

router.get('/stats', async (req, res) => {
  try {
    const database = await connectDB();
    const collection = database.collection('contact_messages');
    
    const total = await collection.countDocuments();
    const unread = await collection.countDocuments({ read: false });
    const read = await collection.countDocuments({ read: true });
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recent = await collection.countDocuments({ 
      createdAt: { $gte: oneWeekAgo } 
    });

    console.log(`Admin: Stats - Total: ${total}, Unread: ${unread}, Recent: ${recent}`);
    
    res.status(200).json({
      success: true,
      stats: {
        total,
        unread,
        read,
        recent
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      msg: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;