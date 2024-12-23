import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { blogService } from "./blog.service";
import { sendResponse } from "../../utils/sendResponse";

const createBlogs=catchAsync(async(req,res)=>{
    const user=req.user
    // console.log(user, 'con')
    const payload=req.body
    const result=await blogService.createBlog(user,payload)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message:"Blog created successfully",
        data: result,
    });
})
export const blogController={
    createBlogs
}