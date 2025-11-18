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

app.use('*', (req, res, next) => {
  authenticate(req, res, next);
});

app.use(express.static(path.join(__dirname, 'admin-panel/dist')));
app.use('/api', adminRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-panel/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});