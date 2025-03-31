export interface login_details {
    username: string;
    password: string;
}

export interface user {
    id: string;
    username: string;
    email: string;
    password: string;
    name?: string;
    bio?: string;
    location?: string;
    d_o_b?: string;
    website?: string;
    profileImage?: string;
    headerImage?: string;
}

export interface new_user { 
    name: string; 
    username: string; 
    email: string; 
    password: string; 
}

// Updated token_details interface
export interface token_details {
    token?: string; // Include token as an optional property
    info?: {
        id: string;
        username: string;
        email: string;
        name: string;
        role: string;
    };
    error?: {
        message: string;
    };
}