import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User, UserDocument } from '../models/user.model';

export class userService {
    login(body: any) {
        throw new Error("Method not implemented.");
    }
    async registerUser(userData: UserDocument) {
        try {
            // Check if email already exists
            const emailExists = await User.findOne({ email: userData.email });
            if (emailExists) {
                return { error: 'Email already in use' };
            }

            // Check if phone number already exists
            const phoneNoExists = await User.findOne({ phone_number: userData.phone_number });
            if (phoneNoExists) {
                return { error: 'Phone number already in use' };
            }

            // Hash password
            const hashedPassword = bcrypt.hashSync(userData.password, 10);

            // Create new user
            const newUser = new User({
                id: uuidv4(),
                name: userData.name,
                email: userData.email,
                phone_number: userData.phone_number,
                password: hashedPassword,
                role: 'user', // Default role
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