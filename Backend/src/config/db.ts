import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'mydatabase';

let db: Db | null = null; // To store the database instance

/**
 * Connect to MongoDB and return the database instance.
 */
export async function connectToDatabase(): Promise<Db> {
    if (db) {
        console.log('Database connection is already established.');
        return db; // Return existing connection if available
    }

    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(DATABASE_NAME); // Connect to the specific database
        console.log(`Connected to MongoDB: ${DATABASE_NAME}`);
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
