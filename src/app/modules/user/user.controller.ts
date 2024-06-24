import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthService } from './user.service';
import sendResponse from '../../utils/sendRequest';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin login successful',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
};
