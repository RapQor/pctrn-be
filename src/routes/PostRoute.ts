import { Router } from "express";
import * as postController from "../controllers/PostController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
import { uploadCloudinary } from "../middlewares/cloudinary";
import * as likeController from "../controllers/LikeController";

const postRoute = Router();

postRoute.get("/", postController.findAll);
postRoute.get("/:id", postController.findOne);
postRoute.get("/user/:id", postController.findAllByUser);

postRoute.post("/", authorization, upload.single('image'), uploadCloudinary, postController.create);

postRoute.put("/:id", postController.update);
postRoute.delete("/:id", postController.deletePost);

postRoute.post("/:id/like", authorization, likeController.likePost);
postRoute.delete("/:id/like", authorization, likeController.unlikePost);
postRoute.get("/:id/likes", likeController.getLikes);
postRoute.get("/:id/like/check", authorization, likeController.checkUserLike);

export default postRoute;
