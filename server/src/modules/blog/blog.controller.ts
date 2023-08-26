import { Body, Controller, Delete, Get, Post, Put, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { BlogCreateDto } from "./dto/create-blog.dto";
import { plainToClass } from "class-transformer";
import { Blog } from "./blog.entity";
import { validate, validateSync } from "class-validator";
import { Request } from "express";

@Controller('blogs')
@UsePipes(new ValidationPipe({whitelist:true}))
export class BlogController {
    constructor(){}

    @Get()
    queryBlogList(){
        
    }

    @Post()
    createBlog(@Body() params:BlogCreateDto,@Req() request:Request){
        const user = request.user as {userId:string}
        const userId = user.userId        
    }

    @Put()
    editBlog(){

    }

    @Delete()
    deleteBlog(){

    }
}