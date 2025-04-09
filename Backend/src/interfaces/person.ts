/**
 * Interface for user data stored in the database
 */
export interface UserDocument {
    username: string;
    password: string;
}

/**
 * Interface for login details sent in the request body
 */
export interface LoginDetails {
    username: string;
    password: string;
}

/**
 * Interface for the response returned after login
 */
export interface LoginResponse {
    message?: string;
    token?: string;
    error?: string;
}