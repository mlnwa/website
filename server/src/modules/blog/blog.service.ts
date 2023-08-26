import { Body, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Blog } from "./blog.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ResultModel } from "src/common/result/ResultModel";

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository : Repository<Blog>
    ){}

    async createBlog(blog):Promise<ResultModel>{
        await this.blogRepository.save(blog)
        return ResultModel.builderSuccessMsg('新增成功')
    }
}