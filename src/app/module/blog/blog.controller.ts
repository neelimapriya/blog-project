import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { blogService } from "./blog.service";
import { sendResponse } from "../../utils/sendResponse";

const createBlogs = catchAsync(async (req, res) => {
  const user = req.user;
  // console.log(user, 'con')
  const payload = req.body;
  const result = await blogService.createBlog(user, payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
//   console.log(id);
  const user = req.user._id;
//   console.log(user, "user");
  const payload = req.body;
  const result = await blogService.UpdateBlogFromDb( user,id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "blog updated successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getBlogs(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blogs retrieve successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
//   console.log(req.params,req.user._id)
  await blogService.deleteBlog(id, userId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blogs deleted successfully",
    data: null,
  });
});

export const blogController = {
  createBlogs,
  updateBlog,
  getAllBlogs,
  deleteBlog,
};
