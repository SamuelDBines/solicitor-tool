import * as settings from './settings';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: "Access token is required" });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], settings.JWT_SECRET); // Remove 'Bearer' prefix
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};