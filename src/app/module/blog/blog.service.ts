import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";

import { Blog } from "./blog.model";
import AppError from "../../errors/appErrors";
import { StatusCodes } from "http-status-codes";
import { User } from "../users/user.model";

const createBlog = async (user:JwtPayload,payload:IBlog) => {

  const authUser = await User.findOne({ email: user.email });
    if (!authUser) {
        throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
    }
    console.log(authUser);
    const blogPayload: IBlog = {
      ...payload, 
      userId: authUser._id, 
      author:authUser.name
  };

  const result = await Blog.create(blogPayload);
  return result;
};

export const blogService = {
  createBlog,
};
