import express from 'express';
import auth from '../../middleware/auth';
import { User_Role } from '../users/user.const';
import { AdminController } from './admin.controller';

const router=express.Router()

router.patch('/users/:userId/block',auth(User_Role.admin),AdminController.BlockUser)
router.delete('/blogs/:id',auth(User_Role.admin),AdminController.deleteBlog)

export const AdminRoute=router