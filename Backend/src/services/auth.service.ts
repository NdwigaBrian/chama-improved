import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Import Mongoose User model
import { User } from '../models/User';
import { login_details } from '../interfaces/user';

export class authService {
  async login(logins: login_details) {
    try {
      // Find the user in MongoDB by email
      const user = await User.findOne({ email: logins.email });

      if (!user) {
        return {
          error: 'User not found',
        };
      }

      // Compare the provided password with the hashed password
      const passwordMatches = bcrypt.compareSync(logins.password, user.password);

      if (passwordMatches) {
        // Destructure and exclude sensitive fields from the user object
        const { password, createdAt, ...rest } = user.toObject();

        // Generate a JWT token
        const token = jwt.sign(rest, process.env.SECRET_KEY as string, {
          expiresIn: '2h',
        });

        return {
          message: 'Logged in successfully',
          token,
        };
      } else {
        return {
          error: 'Incorrect password',
        };
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Login error:', error);
      return {
        error: 'An error occurred during login. Please try again later.',
      };
    }
  }
}
