const express = require('express');
const { MongoClient } = require('mongodb'); // Import MongoDB client
require('dotenv').config(); // For environment variables (optional)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'; // Your MongoDB URI
const DATABASE_NAME = 'mydatabase'; // Name of your database

let db; // To hold the database instance

async function connectToMongoDB() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(DATABASE_NAME); // Connect to the specified database
        console.log(`Connected to MongoDB: ${DATABASE_NAME}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the app if the connection fails
    }
}

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Example route to fetch data from MongoDB
app.get('/users', async (req, res) => {
    try {
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Example route to insert data into MongoDB
app.post('/users', async (req, res) => {
    try {
        const newUser = req.body; // Get the user data from the request body
        const result = await db.collection('users').insertOne(newUser);
        res.status(201).json(result); // Respond with the result
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Start the server after connecting to MongoDB
connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
