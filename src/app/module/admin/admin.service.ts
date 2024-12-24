import { JwtPayload } from "jsonwebtoken";
import { User } from "../users/user.model";
import AppError from "../../errors/appErrors";
import { StatusCodes } from "http-status-codes";
import { Blog } from "../blog/blog.model";

const blockUser = async (blockId: string, user: JwtPayload) => {
  const blockUser = await User.findById(blockId);
  if (!blockUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }
  if (blockUser._id.toString() === user._id.toString()) {
    throw new AppError(StatusCodes.FORBIDDEN, "You can't block yourself");
  }

  const result = await User.findByIdAndUpdate(blockId, { isBlocked: true });

  return result;
};

const deleteBlog = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, "This blog is not found!");
  }
};
export const AdminService = { blockUser, deleteBlog };
