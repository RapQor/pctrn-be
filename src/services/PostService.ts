import { PostModels } from "../models/PostModels";
import BaseService from "./BaseService";

class PostService extends BaseService<PostModels> {
    public posts: PostModels[] = [];

    findAll() {
        return this.posts
    }

    findOne(id: number) {
        return this.posts[id];
    }

    create(tittle: string, body: string) {
        const post = new PostModels(tittle, body);
        this.posts.push(post);
        return post;
    }

    update(id: number, tittle: string, body: string) {
        const post = new PostModels(tittle, body);
        this.posts[id] = post;
        return post;
    }

    delete(id: number) {
        return this.posts.splice(id, 1);
    }
}

export default PostService