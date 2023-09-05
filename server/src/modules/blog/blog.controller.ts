import { Body, Controller, Delete, Get, Post, Put, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { plainToClass } from "class-transformer";
import { BlogEntity } from "./blog.entity";
import { validate, validateSync } from "class-validator";
import { Request } from "express";
import { PaginationDto } from "src/common/dtos";
import { BlogService } from "./blog.service";
import { UserEntity } from "../user/user.entity";

@Controller('blogs')
@UsePipes(new ValidationPipe({whitelist:true}))
export class BlogController {
    constructor(
        private readonly blogService:BlogService
    ){}

    @Get()
    queryBlogList(@Body() pagenationDto:PaginationDto){
        return this.blogService.queryBlogList(pagenationDto)
    }

    @Post()
    createBlog(@Body() createBlogDto:CreateBlogDto,@Req() request:Request){
        const user = request.user as {userId:string}
        const userId = user.userId 
        const blog = JSON.parse(createBlogDto.data) as BlogEntity
        blog.user = { id: userId } as unknown as UserEntity
        this.blogService.createBlog(blog)
    }

    @Put()
    editBlog(){

    }

    @Delete()
    deleteBlog(){

    }
}