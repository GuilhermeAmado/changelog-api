import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

type UserToCreateJWT = Pick<User, 'id' | 'username'>;

type ProtectedRouteRequest = Request & {
  user?: string | jwt.JwtPayload;
};

export const comparePasswords = (password: string | Buffer, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string | Buffer) => {
  return bcrypt.hash(password, 10);
};

export const createJWT = (user: UserToCreateJWT) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Missing env variable');
  }
  const { id, username } = user;

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET);

  return token;
};

export const protectRoute = (
  req: ProtectedRouteRequest,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: 'Unauthorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.json({ message: 'Invalid token' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET ?? '');
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: 'Unauthorized' });
  }
};
