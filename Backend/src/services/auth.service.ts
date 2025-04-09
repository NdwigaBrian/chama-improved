import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user';
import { LoginDetails } from '../interfaces/person';

// Load environment variables
dotenv.config();

export class authService {
  async login(logins: LoginDetails) {
    try {
      // Find the user in MongoDB by username
      const user = await User.findOne({ username: logins.username });

      if (!user) {
        return { error: 'User not found' };
      }

      // Compare the provided password with the hashed password
      const passwordMatches = await bcrypt.compare(logins.password, user.password);

      if (passwordMatches) {
        // Destructure and exclude sensitive fields from the user object
        const { password, ...rest } = user.toObject();

        // Ensure SECRET_KEY is defined
        if (!process.env.SECRET_KEY) {
          throw new Error('SECRET_KEY is not defined in the environment variables');
        }

        // Generate a JWT token
        const token = jwt.sign(rest, process.env.SECRET_KEY, { expiresIn: '2h' });

        return { message: 'Logged in successfully', token };
      } else {
        return { error: 'Incorrect password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'An error occurred during login. Please try again later.' };
    }
  }
}