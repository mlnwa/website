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

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UserController {
  constructor(private userService: UserService) {}
  @Public()
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
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
