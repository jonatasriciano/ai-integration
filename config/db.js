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

process.on('SIGINT', async () => {
    if (client) {
        await client.close();
        console.log('MongoDB client disconnected');
        process.exit(0);
    }
});

export default connectDB;