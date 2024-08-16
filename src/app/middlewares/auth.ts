import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

import UnAuthorize from '../errors/unauthorizedError';
import { User } from './../modules/user/user.model';

const auth = (...requiredRole: any[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnAuthorize('Unauthorized Access');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // console.log(decoded);

    // const { username, role, email, iat, exp } = decoded;
    const { email, role } = decoded;

    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized Access');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new UnAuthorize('Unauthorized Access.');
    }

    req.user = decoded as JwtPayload & {
      role: string;
      _id: string;
      email: string;
      iat: string;
      exp: string;
    };

    next();
  });
};

export default auth;
