import { Router } from 'express';
import prismaClient from '../utils/prisma';
const router = Router();

router.get('/', async (req, res) => {
  const users = await prismaClient.user.findMany();
  res.status(200).send(users);
});

export default router;