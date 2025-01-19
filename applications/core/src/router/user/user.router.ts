import { Router } from 'express';
import prismaClient from '../../utils/prisma';
import * as S from '../../utils/settings';
import { auth, signToken, verifyToken } from '../../utils/auth';
import { hashPassword, verifyPassword } from '../../utils/bcrypt';
import { idParamCheck } from '../../utils/helpers';
import prisma from '../../utils/prisma';
const router = Router();

const loginAttempts: Map<string, { attempts: number; blockUntil: number | null; }> = new Map();

router.get('/', auth, async (req, res) => {
  const users = await prismaClient.user.findMany();
  res.status(200).send(users);
});

router.get('/:id', auth, idParamCheck, async (req, res) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;
  const user = await prismaClient.user.findFirst({
    where: {
      id
    }
  });
  res.status(200).send(user);
});

router.post('/register', async (req, res) => {
  const data: {
    fullName: string,
    email: string,
    password;
  } = req.body;

  if (!data.email || !data.password || !data.fullName) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email
    }
  });
  if (existingUser) {
    res.status(409).json({ message: 'User already exists' });
    return;
  }

  const hashedPassword = await hashPassword(data.password);
  try {
    await prisma.$transaction(async (tx) => {
      return await tx.user.create({
        data: {
          email: data.email,
          name: data.fullName,
          password: hashedPassword,
        },
      });
    });
    res.status(201).send({
      message: 'Registered successfully',
    });
  } catch (error) {
    console.error('Transaction failed:', error.message);
    res.status(500).send({
      message: 'Registration failed. Please try again later.',
    });
  }
});

router.post('/login', async (req, res) => {
  const data: { email: string, password: string; } = req.body;
  console.log(data);
  const userAttempts = loginAttempts.get(data.email);
  const now = Date.now();

  if (userAttempts && userAttempts.blockUntil && now < userAttempts.blockUntil) {
    const timeRemaining = Math.ceil((userAttempts.blockUntil - now) / 1000);
    res.status(429).send({
      message: `Too many failed attempts. Please try again in ${timeRemaining} seconds.`,
    });
    return;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      email: data.email
    }
  });

  if (!user || !(await verifyPassword(data.password, user.password))) {
    if (!loginAttempts.has(data.email)) {
      loginAttempts.set(data.email, { attempts: 1, blockUntil: null });
    } else {
      const userAttempts = loginAttempts.get(data.email);
      userAttempts.attempts += 1;
      if (userAttempts.attempts >= S.MAX_ATTEMPTS) {
        userAttempts.blockUntil = now + S.BLOCK_DURATION;
      }
      loginAttempts.set(data.email, userAttempts);
    }

    const remainingAttempts = S.MAX_ATTEMPTS - (loginAttempts.get(data.email)?.attempts || 0);
    res.status(403).send({
      attempts: remainingAttempts,
      message: `Incorrect email or password. You have ${remainingAttempts} attempt(s) left.`,
    });
    return;
  }

  res.status(200).send({
    message: 'Login successful',
    token: signToken({
      sub: user.id,
      id: user.id,
      email: user.email
    }),
    name: user.name
  });
});

export default router;