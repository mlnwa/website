import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from 'src/common/guards';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login/email')
  async loginWithEmail(@Request() request) {
    return this.authService.login(request.user);
  }

  @Public()
  @Post('verify/email')
  async sendEmail(@Body() body: { email: string }) {
    return this.authService.sendEmailCode(body.email);
  }
}
