import { BadRequestException, Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { ResultModel } from "src/common/result/ResultModel";
import { UserCreateDto } from "./dto/create-user.dto";
import {validate} from "class-validator"

@Controller('users')
@UsePipes(new ValidationPipe({whitelist:true}))
export class UserController {
    constructor(
        private userService: UserService
    ) { }
    @Get()
    async findAll() {
        let res
        try {
            res = await this.userService.findAll()
        } catch (error) {
            console.log(error);
            return ResultModel.builderErrorDesc(error.message)
        }
        return res
    }

    @Post()
    async create(@Body() user:UserCreateDto){
        console.log(user);
        const errors =  await validate(user)
        console.log(errors.length);
        
    }
}