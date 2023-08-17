import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { Injectable } from "@nestjs/common";
import { User } from "../user/user.entity";

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

    async login(user: any): Promise<any> {
        const payload = { username: user.username, sub: user.userId }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}