import express, { Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import userRouter from './router/user.router'; // Adjust the path accordingly

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS for all origins
app.use(cors()); // Add this line to enable CORS

const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DATABASE_NAME: string = 'auth-db';

let db: Db;

async function connectToMongoDB() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(DATABASE_NAME);
        console.log(`✅ Connected to MongoDB: ${DATABASE_NAME}`);
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connectToMongoDB().then(() => {
    // ✅ Register routes after DB connection is established

    // Basic route
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, World!');
    });

    // Get users
    app.get('/users', async (req: Request, res: Response) => {
        try {
            const users = await db.collection('users').find().toArray();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    });

    // Add user
    app.post('/users/create', async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body;
    
            if (!username || !password) {
                res.status(400).json({ error: 'All fields are required' });
                return;
            }
    
            const newUser = { username,password };
            const result = await db.collection('users').insertOne(newUser);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Failed to add user' });
        }
    });

    // ✅ Fixed Login Route
    app.post('/auth/login', async (req: Request, res: Response): Promise<void> => {
    console.log('Request body:', req.body); // Log the request body for debugging
        try {
            const { username, password } = req.body;//expecting username and password
            
            if (!username || !password) {
                res.status(400).json({ error: 'All fields are required' });
                return;
            }
            const user = await db.collection('users').findOne({ username });//query by username      

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            if (user.password !== password) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            res.status(200).json({ 
                token: 'abc123', // Example token
                info: { id: user._id, role: user.role } // Include user info
              });
            } catch (error) {
              res.status(500).json({ error: 'Something went wrong' });
        }
    });

    // Start server
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});