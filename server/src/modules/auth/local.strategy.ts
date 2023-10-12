import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const userResult = await this.authService.validateUser(username, password);
    if (!userResult.getSuccess()) {
      throw new UnauthorizedException(userResult.getMsg());
    }
    return userResult.getResult();
  }
}
