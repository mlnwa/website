import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "src/common/decorators/public.decorator";
import { LocalAuthGuard } from "src/common/guards";

@Controller("/auth")
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() request){
        return this.authService.login(request.user)
    }

    @Get()
    getProfile(@Request() req){
        return req.user
    }

    @Public()
    @Post('refresh')
    async refreshAccessToken(@Body() body:{refreshToken:string}){
        return this.authService.refreshAccessToken(body.refreshToken)
    }
}