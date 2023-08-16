import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @UseGuards(AuthGuard("local"))
    @Post("/auth/login")
    async login(@Request() request){
        return this.authService.login(request.user)
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    getProfile(@Request() req){
        return req.user
    }
}