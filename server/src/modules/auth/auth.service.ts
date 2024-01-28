import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { ResultModel } from 'src/common/result/ResultModel';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(userName: string, password: string): Promise<ResultModel> {
    const userResultModel = await this.userService.findByName(userName);
    if (!userResultModel.getSuccess()) return userResultModel;
    const user: UserEntity = userResultModel.getResult();
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return ResultModel.builderSuccess().setResult(result);
    }
    return ResultModel.builderErrorMsg('密码错误');
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
