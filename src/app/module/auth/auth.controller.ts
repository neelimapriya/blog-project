import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { sendResponse, sendResponseWithToken } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.registerUser(payload);
  //   console.log(result);
  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { token, user } = result;

  sendResponseWithToken(res, {
    success: true,
    message: "Login successful",
    statusCode: StatusCodes.OK,
    token:token,
   data: user,
  });
});

export const authController = {
  registerUser,
  loginUser,
};
