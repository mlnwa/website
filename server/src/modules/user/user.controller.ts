import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RedisService } from '../redis/redis.service';
import { ResultModel } from 'src/common/result/ResultModel';
import { QueryPagesUserDto } from './dto/query-user.dot';

@Controller('user')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UserController {
  constructor(private userService: UserService, private redisService: RedisService) {}
  @Public()
  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    const { emailCode, ...userProps } = createUserDto;
    const cacheCode = await this.redisService.get(userProps.email);
    if (emailCode !== cacheCode) {
      return ResultModel.builderErrorMsg('验证码错误');
    }
    const createModel = await this.userService.create(userProps);
    if (!createModel.getSuccess()) return createModel;
    this.redisService.del(userProps.email);
    return createModel;
  }

  @Get('list')
  async getUserList(@Query() queryPagesUserDto: QueryPagesUserDto) {
    return this.userService.queryPages(queryPagesUserDto);
  }

  @Put()
  updateUser() {}

  @Delete(':id')
  deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.delete(id);
  }
}
