import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './user.validation';
import { AuthControllers } from './user.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;