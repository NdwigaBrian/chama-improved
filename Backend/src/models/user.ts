import mongoose, { Schema, Document } from 'mongoose';

/**
 * Mongoose document interface for a User
 */
export interface UserDocument extends Document {
    username: string;
    password: string;
}

/**
 * Schema definition for the User model
 */
const UserSchema = new Schema<UserDocument>({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

/**
 * Mongoose model for User
 */
export const User = mongoose.model<UserDocument>('User', UserSchema);

/**
 * Interfaces for login details and token details
 */
export interface LoginDetails {
    username: string;
    password: string;
}

export interface TokenDetails {
    id: string;
    username: string;
    email: string;
    role: string;
}
