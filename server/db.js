const { MongoClient } = require('mongodb');

const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://wassimtajeddin:${password}@cluster.vxwsnsd.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster`;

let client;
let db;

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

function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectDB first.');
  }
  return db;
}

module.exports = { connectDB, getDB };