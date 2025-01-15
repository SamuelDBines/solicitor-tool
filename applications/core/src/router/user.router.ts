import { Router } from 'express';
import prismaClient from '@app/domain';
const router = Router();

router.get('/', async (req, res) => {
  const users = await prismaClient.users.findMany();
  res.status(200).send(users);
});

export default router;