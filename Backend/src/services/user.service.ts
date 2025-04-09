import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User, UserDocument } from '../models/user';

export class userService {
  async registerUser(userData: UserDocument) {
    try {
      // Check if username already exists
      const usernameExists = await User.findOne({ username: userData.username });
      if (usernameExists) {
        return { error: 'Username already in use' };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create new user
      const newUser = new User({
        id: uuidv4(),
        username: userData.username,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      await newUser.save();
      return { message: 'Account created successfully' };
    } catch (error) {
      console.error('Error creating user:', error);
      return { error: 'Unable to create account' };
    }
  }
}