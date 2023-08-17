import { BadRequestException, Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { ResultModel } from "src/common/result/ResultModel";
import { UserCreateDto } from "./dto/create-user.dto";
import {validate} from "class-validator"
import { RolesGuard } from "src/common/guards";

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
            return ResultModel.builderErrorMsg(error.message)
        }
        return res
    }

    @Post()
    async create(@Body() user:UserCreateDto){
        return this.userService.create(user)
    }
}