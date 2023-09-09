import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { ResultModel } from 'src/common/result/ResultModel';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const userResultModel = await this.userService.findByUserName(userName);
    if (!userResultModel.getSuccess()) return userResultModel.getMsg();
    const user: UserEntity = userResultModel.getResult();
    if (user.password == password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<ResultModel> {
    const payload = { username: user.name, sub: user.id };
    const token = this.jwtService.sign(payload);
    return ResultModel.builderSuccess().setResult({
      accessToken: token,
    });
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
  }
}
