export enum Role {
  ADMIN = "ADMIN",
  ASSOCIADO = "ASSOCIADO"
}

export interface BaseUserInterface {
  name: string;
  email: string;
  role: Role;
}

export interface CreateUserInterface extends BaseUserInterface {
  password: string;
}

export interface UpdateUserInterface {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export interface DeleteUserInterface {
  id: number;
}

export interface ListUserInterface {
  id: number;
}
