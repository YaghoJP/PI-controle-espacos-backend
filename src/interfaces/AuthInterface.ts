export interface AuthTokenInterface{
    id: number;
    role:string;
    iat: number;
    exp: number;
}

export interface AuthLoginInterface {
    email:string;
    password:string;
}