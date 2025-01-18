import { Router } from 'express';
import prismaClient from '../../utils/prisma';
import * as S from '../../utils/settings';
import { auth } from '../../utils/auth';
import { hashPassword } from '../../utils/bcrypt';
import { idParamCheck } from '../../utils/helpers';
import prisma from '../../utils/prisma';
const router = Router();

router.get('/', auth, async (req, res) => {

  const personGroups = await prismaClient.personGroup.findMany({
    where: {
      members: {
        some: {
          userId: req.user.id
        }
      }
    }
  });
  res.status(200).send(personGroups);
});

router.get('/:id', auth, idParamCheck, async (req, res) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;
  const personGroup = await prismaClient.personGroup.findFirst({
    where: {
      id,
      members: {
        some: {
          userId: req.user.id
        }
      }
    }
  });
  res.status(200).send(personGroup);
});

router.post('/register', auth, async (req, res) => {
  const data: {
    name: string,
    password;
  } = req.body;

  if (!data.password || !data.name) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  const hashedPassword = await hashPassword(data.password);
  try {
    await prisma.$transaction(async (tx) => {
      const personGroup = await prismaClient.personGroup.create({
        data: {
          name: data.name,
          password: hashedPassword,
        },
      });

      await prismaClient.member.create({
        data: {
          personGroupId: personGroup.id,
          userId: req.user.id
        }
      });

      res.status(201).send({
        message: 'Registered successfully',
      });
    });
  } catch (error) {
    console.error('Transaction failed:', error.message);
    res.status(500).send({
      message: 'Registration failed. Please try again later.',
    });
  }
});

const preventNonMembers = async (req, res, next) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;
  const personGroupExists = await prisma.personGroup.findFirst({
    where: {
      id,
      members: {
        some: {
          userId: req.user.id, // Check if the user is a member
        },
      },
    },
  });

  if (!personGroupExists) {
    res.status(404).json({ message: 'PersonGroup not found or user is not a member' });
    return;
  }
  next();
};

router.put('/:id', auth, idParamCheck, preventNonMembers, async (req, res) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;
  const data: {
    name: string,
    password;
  } = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      const updatedPersonGroup = await tx.personGroup.update({
        where: {
          id
        },
        data: {
          name: data.name,
          password: data.password
        },
      });

      res.status(200).json({
        message: 'PersonGroup updated successfully',
        updatedPersonGroup,
      });
    });
  } catch (error) {
    console.error('Transaction failed:', error.message);
    res.status(500).send({
      message: 'Registration failed. Please try again later.',
    });
  }
});

router.put('/:id/members', auth, idParamCheck, preventNonMembers, async (req, res) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;
  const data: {
    emails: string[];
  } = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      const users = await tx.user.findMany({
        where: {
          email: {
            in: data.emails,
          },
        },
        select: {
          id: true,
          email: true,
        },
      });

      if (users.length === 0) {
        throw new Error('No users found for the provided emails');
      }

      const foundEmails = users.map((user) => user.email);
      const notFoundEmails = data.emails.filter((email) => !foundEmails.includes(email));

      const membersData = users.map((user) => ({
        userId: user.id,
        personGroupId: id,
      }));

      await tx.member.createMany({
        data: membersData,
        skipDuplicates: true,
      });

      res.status(200).json({
        message: 'Members added successfully',
        addedEmails: foundEmails,
        notFoundEmails: notFoundEmails,
      });
    });
  } catch (error) {
    console.error('Transaction failed:', error.message);
    res.status(500).send({
      message: 'Registration failed. Please try again later.',
    });
  }
});


export default router;