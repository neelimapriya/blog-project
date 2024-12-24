import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AdminService } from "./admin.service";

const BlockUser = catchAsync(async (req, res) => {
  const blockUserId = req.params.userId;
  const user = req.user;

  const result = await AdminService.blockUser(blockUserId, user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User blocked successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  await AdminService.deleteBlog(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog deleted successfully",
    data: null,
  });
});
export const AdminController = { BlockUser, deleteBlog };
