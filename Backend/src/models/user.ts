import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface
export interface IUser extends Document {
  email: string;
  password: string;
  name?: string; // Optional field for additional user information
}

// Define the User schema
const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true }, // Email must be unique
  password: { type: String, required: true }, // Password is required
  name: { type: String }, // Name is optional
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Export the User model
export const User = mongoose.model<IUser>('User', UserSchema);
