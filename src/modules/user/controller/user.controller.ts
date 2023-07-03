import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { type, message } = await this.userService.findOne(+id);

    if (type) throw new HttpException(message, type);

    return message;
  }
}
