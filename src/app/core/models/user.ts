export interface User {
    username: string;
    token: string;
  }
export interface UserAuthData {
    username: string;
    password: string;
}
export interface loginResponse {
    username: string
    token: string
    message: string
    age:number
}
export interface userProfileInfoInterface {
    username: string
    age: number
    email: string
}
export interface Friend {
    friendName: string;
    friendId: string
    id: string
  }