import { Type } from "class-transformer";
import { Blog } from "../blog.entity";
import { IsNotEmpty, IsString } from "class-validator";


export class BlogCreateDto {
    @IsNotEmpty()
    @IsString()
    data : string
}