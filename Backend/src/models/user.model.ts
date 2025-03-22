import mongoose, { Schema, Document } from 'mongoose';

/**
 * Mongoose document interface for a User
 */
export interface UserDocument extends Document {
    name: string;
    phone_number: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
}

/**
 * Schema definition for the User model
 */
const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

/**
 * Mongoose model for User
 */
export const User = mongoose.model<UserDocument>('User', UserSchema);

/**
 * Interfaces for login details and token details
 */
export interface LoginDetails {
    email: string;
    password: string;
}

export interface TokenDetails {
    id: string;
    name: string;
    email: string;
    role: string;
}
