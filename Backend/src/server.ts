import express, { Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const n: number = 4;
const x: number = 2;

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

// 🚀 Start main server logic after DB connects
connectToMongoDB().then(() => {

  // Home route
  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello, World!');
  });

  // Get all users
  app.get('/users', async (_req: Request, res: Response) => {
    try {
      const users = await db.collection('users').find().toArray();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  // Create new user
  app.post('/users/create', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      const newUser = { username, password };
      const result = await db.collection('users').insertOne(newUser);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  });

  // Helper: Calculate contributions
  function getContributionsForCycle(cycle: number, round: number): { contributions: number[]; total: number } {
    if (round < 1 || round > n) {
      throw new Error('Invalid round number');
    }

    let contributions: number[] = [];

    if (cycle === 1) {
      for (let j = 1; j <= n; j++) {
        contributions.push(j < round ? 2 * x : x);
      }
    } else if (cycle === 2) {
      for (let j = 1; j <= n; j++) {
        contributions.push(j < round ? 4 * x : 2 * x);
      }
    } else {
      throw new Error('Invalid cycle number. Only cycle 1 and 2 are supported.');
    }

    const total = contributions.reduce((sum, val) => sum + val, 0);
    return { contributions, total };
  }

  app.post('/api/getContributions', (req: Request, res: Response): void => {
    try {
      const { cycle, round }: { cycle: number; round: number } = req.body;
      const data = getContributionsForCycle(Number(cycle), Number(round));
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unexpected error' });
      }
    }
  });
  

  // Login route
  app.post('/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      const user = await db.collection('users').findOne({ username });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if (user.password !== password) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      res.status(200).json({
        token: 'abc123',
        info: { id: user._id, role: user.role || 'user' }
      });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  // Start listening
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
