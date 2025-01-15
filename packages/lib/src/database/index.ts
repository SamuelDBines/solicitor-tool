// Base models 
interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseModel {
  email: string;
  password: string;
  name: string;
}

export type OmitBaseModelFields<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export interface DatabaseClient {
  // maintain a list of models
  // example user model
  findUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  createUser(user: OmitBaseModelFields<User>): Promise<User>;
}