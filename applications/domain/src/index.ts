import { DatabaseClient, User } from '@packages/lib';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaDatabaseClient implements DatabaseClient {
  async findUsers(): Promise<User[]> {
    return prisma.user.findMany();
  },

  async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return prisma.user.create({
      data: user,
    });
  },
};
