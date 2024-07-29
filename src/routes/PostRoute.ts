import PostController from "../controllers/PostController";
import BaseRoute from "./BaseRoute";
import express from "express";

import PostService from "../services/PostService";

class PostRoute extends BaseRoute {

    protected postController: PostController;
    constructor() {
        super();
        const postService = new PostService();
        this.postController = new PostController(postService);
    }

    protected initializeRoutes() {
        this.router.get("/post", this.postController.findAll);

        this.router.get("/post/:id", this.postController.findOne);

        this.router.post("/post", this.postController.create);

        this.router.put("/post/:id", this.postController.update);

        this.router.delete("/post/:id", this.postController.delete);

        return this.router;
    }
}

export default PostRoute;