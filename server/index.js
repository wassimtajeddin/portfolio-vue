const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3001;

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
      console.log('Connected to MongoDB');
    }
    return db;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

const authenticate = require('./auth');
const adminRoutes = require('./admin');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'admin-panel/dist')));

app.use('/api', adminRoutes);
app.get('*', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname,'admin-panel/dist/index.html'));
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      msg: 'Please fill in all fields' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      msg: 'Please enter a valid email address' 
    });
  }

  try {
    const database = await connectDB();
    const collection = database.collection('contact_messages');

    const result = await collection.insertOne({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date(),
      read: false
    });

    console.log('Message stored in MongoDB with ID:', result.insertedId);

    res.status(200).json({ 
      success: true, 
      msg: 'Message received successfully! I will get back to you soon.' 
    });
  } catch (error) {
    console.error('Error storing message:', error);
    res.status(500).json({ 
      success: false, 
      msg: 'Database error. Please try again.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});