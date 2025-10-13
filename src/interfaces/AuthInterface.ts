export interface AuthTokenInterface{
    id: number;
    email: string;
    iat: number;
    exp: number;
}

export interface AuthLoginInterface {
    email:string;
    password:string;
}