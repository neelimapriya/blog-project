import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appErrors";
import { TUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const registerUser = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This user is already exist!");
  }
  const result = await User.create(payload);
  return result;
};
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  // console.log(user,'service');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
  }

  // check if the user is already blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, "This user is already blocked!");
  }
  //checking if the password is correct
  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, "Password do not matched");
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email as string,
    role: user.role as string,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string
  );
  // console.log(token);


  return {
    token, user
    //   refreshToken,
  };
};

export const AuthService = {
  registerUser,
  loginUser
};
