import { Router } from "express";
import * as replyController from "../controllers/ReplyController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";

const replyRoute = Router();

replyRoute.get("/post/:post_id", replyController.findAll);

replyRoute.get("/:id", replyController.findOne);

replyRoute.get("/user/:id", replyController.findAllByUser);

replyRoute.post(
    "/post/:post_id",
    authorization,
    upload.single('image'),
    replyController.create
);

replyRoute.put("/:id", replyController.update);

replyRoute.delete("/:id", replyController.deletePost);

export default replyRoute;