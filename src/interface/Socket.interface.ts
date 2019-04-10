import User from './User.interface'

export interface LoginResponse {
    user: User,
    users: User[]
}

export interface UserLoginResponse {
    user: User
}

export interface FriendLogoutResponse {
    uid: string
    reason: string,
    timestamp: Date
}

export interface FriendSendMessage {
    sender: string,
    type: string,
    payload: string,
    timestamp: number
}

export interface FriendRenameMessage {
    user: User,
    timestamp: number
}