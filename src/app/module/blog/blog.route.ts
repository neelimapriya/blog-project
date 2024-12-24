import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { BlogValidation } from "./blog.validation";
import { blogController } from "./blog.controller";
import auth from "../../middleware/auth";
import { User_Role } from "../users/user.const";


const router=Router()
router.post('/',auth(User_Role.user),validateRequest(BlogValidation.createBlogValidationSchema),blogController.createBlogs)
router.patch('/:id',auth(User_Role.user),validateRequest(BlogValidation.updateBlogValidationSchema),blogController.updateBlog)
router.get('/',blogController.getAllBlogs)
router.delete('/:id',auth(User_Role.user),blogController.deleteBlog)

export const BlogRouter=router