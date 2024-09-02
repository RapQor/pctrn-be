
import authRoute from "./AuthRoute";
import postRoute from "./PostRoute";
import { Router } from "express";
import replyRoute from "./ReplyRoute";
import userRoute from "./UserRoute";
import followRouter from "./FollowRoute";

const router = Router();

router.use("/post", postRoute);
router.use("/auth", authRoute);
router.use("/reply", replyRoute);
router.use("/user", userRoute);
router.use("/all", userRoute);
router.use("/follow", followRouter);

export default router