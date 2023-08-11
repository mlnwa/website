import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { ResultModel } from "src/common/result/ResultModel";

@Controller('users')
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
}