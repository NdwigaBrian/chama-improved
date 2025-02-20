export interface login_details {
    email: string,
    password: string
}

export interface user {
    id: string
    username: string
    email: string
    password: string
    name?: string
    bio?: string
    location?: string
    d_o_b?: string
    website?: string
    profileImage?: string
    headerImage?: string
}

export interface new_user { 
    name: string, 
    username: string, 
    email: string, 
    password: string 
}

export interface token_details {
    info?: {
        id: string,
        username: string,
        email: string
        name: string
        role: string
    },
    error?: {
        message: string
    }
}
