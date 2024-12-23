import { Router } from "express";
import { AuthRoute } from "../module/auth/auth.route";
import { BlogRouter } from "../module/blog/blog.route";

const router=Router()

const moduleRoutes=[
    {
        path:'/auth',
        route:AuthRoute
    },
    {
        path:'/blogs',
        route:BlogRouter
    },
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))

export default router;