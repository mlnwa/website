import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Query,
  UseGuards,
  Headers,
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
import { PaginationDto } from 'src/common/dtos';
import * as bcrypt from 'bcrypt';
import { RedisService } from '../redis/redis.service';
import { ResultModel } from 'src/common/result/ResultModel';

@Controller('user')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UserController {
  constructor(private userService: UserService, private redisService: RedisService) {}
  @Public()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { emailCode } = createUserDto;
    const cacheCode = await this.redisService.get(createUserDto.email);
    if (emailCode !== cacheCode) {
      return ResultModel.builderErrorMsg('验证码错误');
    }
    const createModel = await this.userService.create(createUserDto);
    if (!createModel.getSuccess()) return createModel;
    this.redisService.del(createUserDto.email);
    return createModel;
  }

  @Public()
  @Get()
  async getUserList(@Query() paginationDto: PaginationDto) {
    return this.userService.queryPages(paginationDto);
  }

  @Put()
  updateUser() {}

  @Delete(':id')
  deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.delete(id);
  }
}
