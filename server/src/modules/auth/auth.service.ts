import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { User } from "../user/user.entity";
import { ResultModel } from "src/common/result/ResultModel";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(userName: string, password: string): Promise<any> {
        const userResult = await this.userService.findByUserName(userName)
        const user: User = userResult.getResult()
        if (user && user.password == password) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: any): Promise<ResultModel> {
        const payload = { username: user.name, sub: user.id }
        const token = this.jwtService.sign(payload)
        return ResultModel.builderSuccess().setResult(token)
    }
}