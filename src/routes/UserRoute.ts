import { Router } from "express";
import * as userController from "../controllers/UserController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";

const userRoute = Router();

userRoute.get("/", authorization, userController.getProfile);
userRoute.get("/all", authorization, userController.getAllUsers);
userRoute.get('/search', authorization, userController.searchUsers);

userRoute.get('/current-user', authorization, userController.getCurrentUser);

userRoute.patch('/update-profile/:id', authorization, upload.single('profile_pic'), userController.updateUserProfile);
userRoute.get('/post/user-media', authorization, userController.getUserMedia);

export default userRoute;