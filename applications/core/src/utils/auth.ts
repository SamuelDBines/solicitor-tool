import * as settings from './settings';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: "Access token is required" });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


export function verifyToken(token: string) {
  const decoded = jwt.verify(token.split(' ')[1], settings.JWT_SECRET);
  return decoded;
}


export function signToken(payload: object,
  options: {
    expiresIn: string;
  } = { expiresIn: '1h' }): string {
  const token = jwt.sign(payload, settings.JWT_SECRET, options);
  return token;
}