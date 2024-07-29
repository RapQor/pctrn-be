import PostController from "../controllers/PostController";
import BaseRoute from "./BaseRoute";
import express from "express";

class PostRoute extends BaseRoute {

    protected postController: PostController;
    constructor() {
        super();
        this.postController = new PostController();
    }

    public routes() {
        this.router.route("/post").get(this.postController.findAll);

        this.router.route("/post/:id").get(this.postController.findOne);

        this.router.route("/post").post(this.postController.create);

        this.router.route("/post/:id").put(this.postController.update);

        this.router.route("/post/:id").delete(this.postController.delete);

        return this.router;
    }
}

export default new PostRoute().routes;