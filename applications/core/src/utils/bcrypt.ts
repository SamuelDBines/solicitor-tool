import bcrypt from 'bcrypt';

const saltRounds = 10; // Determines the complexity of the hash (higher = more secure but slower)

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(inputPassword, storedHash);
  return isMatch;
}