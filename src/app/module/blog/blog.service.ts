import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";
import { Types } from "mongoose";
import { Blog } from "./blog.model";
import AppError from "../../errors/appErrors";
import { StatusCodes } from "http-status-codes";
import { User } from "../users/user.model";
import QueryBuilder from "../../builder/queryBuilder";

const createBlog = async (user: JwtPayload, payload: IBlog) => {
  const authUser = await User.findOne({ email: user.email });
  if (!authUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
  }
  // console.log(authUser);
  const blogPayload: IBlog = {
    ...payload,
    userId: authUser._id,
    author: authUser.name,
  };

  const result = await Blog.create(blogPayload);
  return result;
};

const UpdateBlogFromDb = async (
  user: string,
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog> => {
  console.log(user, id);
  // find blog from db
  const blog = await Blog.findById(new Types.ObjectId(id));
  console.log(blog);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found!");
  }

  // match  blog author with logged in user
  if (blog.userId.toString() !== user) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Only author of this blog can update the blog!"
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result as IBlog;
};
const getBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(
    Blog.find().populate({
      path: "author",
      select: "-role -isBlocked",
    }),
    query
  )
    .search(["title", "content"])
    .filter()
    .sort();

  const result = await blogsQuery.modelQuery;
  return result;
};

export const blogService = {
  createBlog,
  UpdateBlogFromDb,
  getBlogs
};
