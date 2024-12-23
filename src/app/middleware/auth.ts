import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../module/users/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appErrors";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../module/users/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(" ")[1];
    console.log(token, "auth.ts");

    // check if the token is not sent from the user
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    // verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    const { role, email } = decoded;

    const user = await User.isUserExistsByEmail(email);
    // console.log(user);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
    }

    // check if the user is already blocked
    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "This user is already blocked!"
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
