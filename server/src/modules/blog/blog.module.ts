import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "./blog.entity";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";

@Module({
    imports:[TypeOrmModule.forFeature([BlogEntity])],
    controllers:[BlogController],
    providers:[BlogService]
})
export class BlogModule {

}