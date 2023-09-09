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
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResultModel } from 'src/common/result/ResultModel';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { RolesGuard } from 'src/common/guards';
import { Public } from 'src/common/decorators/public.decorator';
import { Request } from 'express';
import { PaginationDto } from 'src/common/dtos';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll() {
    let res;
    try {
      res = await this.userService.findAll();
    } catch (error) {
      return ResultModel.builderErrorMsg(error.message);
    }
    return res;
  }
  @Public()
  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get('list')
  async getUserList(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
  }
}
