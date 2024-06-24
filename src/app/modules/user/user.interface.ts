import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

/* eslint-disable no-unused-vars */
export interface TUser {
  _id: string;
  email: string;
  password: string;
  role: 'admin';
}

export interface TLoginUser {
  email: string;
  password: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsId(id: string): Promise<TUser | null>;
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isUserExistsByUserName(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isPasswordCompare(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
