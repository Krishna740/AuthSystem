import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const generateAccessToken = (userId) =>
  jwt.sign({ sub: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const generateRefreshToken = (userId) =>
  jwt.sign({ sub: userId }, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn });

export const verifyAccessToken = (token) => jwt.verify(token, env.jwtSecret);
export const verifyRefreshToken = (token) => jwt.verify(token, env.jwtRefreshSecret);
