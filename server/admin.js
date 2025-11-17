const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const connectDB = require('./db');

function handleError(res, error, message) {
  console.error(message, error);
  res.status(500).json({ success: false, msg: message });
}

router.get('/messages', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('contact_messages');
    const messages = await collection.find().sort({ createdAt: -1 }).toArray();

    console.log(`Fetched ${messages.length} messages`);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    handleError(res, error, 'Failed to fetch messages');
  }
});

router.put('/messages/:id/read', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('contact_messages');

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { read: true } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, msg: 'Message not found' });
    }

    console.log(`Marked message ${req.params.id} as read`);
    res.status(200).json({ success: true });
  } catch (error) {
    handleError(res, error, 'Failed to mark message as read');
  }
});

router.put('/messages/:id/unread', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('contact_messages');

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { read: false } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, msg: 'Message not found' });
    }

    console.log(`Marked message ${req.params.id} as unread`);
    res.status(200).json({ success: true });
  } catch (error) {
    handleError(res, error, 'Failed to update message');
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('contact_messages');

    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, msg: 'Message not found' });
    }

    console.log(`Deleted message ${req.params.id}`);
    res.status(200).json({ success: true, msg: 'Message deleted successfully' });
  } catch (error) {
    handleError(res, error, 'Failed to delete message');
  }
});

router.get('/stats', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('contact_messages');

    const total = await collection.countDocuments();
    const unread = await collection.countDocuments({ read: false });
    const read = await collection.countDocuments({ read: true });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recent = await collection.countDocuments({ createdAt: { $gte: oneWeekAgo } });

    console.log(`Stats - Total: ${total}, Unread: ${unread}, Recent: ${recent}`);
    res.status(200).json({ success: true, stats: { total, unread, read, recent } });
  } catch (error) {
    handleError(res, error, 'Failed to fetch statistics');
  }
});

module.exports = router;