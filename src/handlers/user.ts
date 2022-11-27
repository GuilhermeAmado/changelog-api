import { User } from '@prisma/client';
import { Response } from 'express';
import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';
import { TypedRequestBody } from '../types';

type UserRequest = TypedRequestBody<Pick<User, 'username' | 'password'>>;

export const createNewUser = async (req: UserRequest, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUser) {
    res.status(409).json({ message: 'Username already taken' });
    return;
  }

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const token = createJWT(user);

  res.status(201).json({ token });
};

export const signIn = async (req: UserRequest, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    res.status(401);
    res.json({
      message: 'Unauthorized',
    });
    return;
  }

  const isValid = await comparePasswords(password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({
      message: 'Unauthorized',
    });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
