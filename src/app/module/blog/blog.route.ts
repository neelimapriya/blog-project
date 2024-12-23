import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { BlogValidation } from "./blog.validation";
import { blogController } from "./blog.controller";
import auth from "../../middleware/auth";
import { User_Role } from "../users/user.const";


const router=Router()
router.post('/',auth(User_Role.user,User_Role.admin),validateRequest(BlogValidation.createBlogValidationSchema),blogController.createBlogs)

export const BlogRouter=router