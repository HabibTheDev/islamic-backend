import httpStatus from 'http-status';
import { TLoginUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import { createToken } from './user.utils';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');
  }

  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const innerData = {
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    token,
  };

  const response = innerData;

  return response;
};

export const AuthService = {
  loginUser,
};
