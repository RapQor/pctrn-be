import express from "express";
import Authorization from "../middlewares/authorization";
import * as followController from "../controllers/FollowController";

const followRouter = express.Router();

followRouter.post("/follow", Authorization, followController.handleFollowUser);
followRouter.delete("/unfollow", Authorization, followController.handleUnfollowUser);
followRouter.get("/followers/:id", Authorization, followController.handleGetFollowers);
followRouter.get("/following/:id", Authorization, followController.handleGetFollowing);
followRouter.post("/follow/status", Authorization, followController.handleGetFollowStatus);

export default followRouter;