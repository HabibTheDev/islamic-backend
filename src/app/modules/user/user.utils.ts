import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createToken = (
  jwtPayload: { _id: string; role: string; email: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export class PasswordUtils {
  static async isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      return false;
    }
  }
}

export default PasswordUtils;
