import express, { Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
    app.post('/users', async (req: Request, res: Response) => {
        try {
            const newUser = req.body;
            const result = await db.collection('users').insertOne(newUser);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add user' });
        }
    });

    // ✅ Fixed Login Route
    app.post('/auth/login', async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await db.collection('users').findOne({ email });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            if (user.password !== password) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    });

    // Start server
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});
