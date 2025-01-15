import { Router } from 'express';
import dbClient from '@packages/database';
const router = Router();

router.get('/', async (req, res) => {
  const users = await dbClient.findUsers();
  res.status(200).send(users);
});

export default router;