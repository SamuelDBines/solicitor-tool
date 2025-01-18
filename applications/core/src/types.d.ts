import { User } from '@prisma/client'; // Adjust this to your User model import if applicable

declare global {
  namespace Express {
    export interface Request {

      tokens?: any;
      user?: {
        id: number;
        email: string;

      }; // Add custom properties here
    }
  }
}
