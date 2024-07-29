import { PostModels } from "../models/PostModels";
import PostService from "../services/PostService";
import {BaseController} from "./BaseControlle";

import { Response, Request } from "express";

class PostController extends BaseController {

    private postServices: PostService;

    constructor(postService: PostService) {
        super();
        this.postServices = postService;
    }
    public findAll(req: Request, res: Response) {
        res.send(this.postServices.findAll());
    }

    public findOne(req: Request, res: Response) {
        res.send(this.postServices.findOne(+req.params.id));
    }

    public create(req: Request, res: Response) {
        const body = req.body;

        const post = this.postServices.create(body.tittle, body.body);

        res.send(post);
    }

    public update(req: Request, res: Response) {
        const body = req.body;
        const id = +req.params.id;

        const post = this.postServices.update(id, body.tittle, body.body);

        res.send(post);
    }

    public delete(req: Request, res: Response) {
        const id = +req.params.id;

        this.postServices.delete(id);
        res.send({
            message: 'post with id ${id} has been deleted',
        });
    }
}

export default PostController;