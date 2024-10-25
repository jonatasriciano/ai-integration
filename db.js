// db.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client, db;

async function connectDB() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db();  // Database Name
    }
    return db;
}

export default connectDB;