import 'dotenv/config';

export const isTestEnv = process.env.NODE_ENV === 'test';
export const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
export const DB_URL = process.env.DATABASE_URL || (process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/dev');
export const PORT = process.env.PORT || 5000;
