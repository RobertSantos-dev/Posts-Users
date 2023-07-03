import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  HttpException,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
// import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postService.create(createPostDto);
    } catch (error) {
      throw new HttpException('Conflict, user inexist', 409);
    }
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { type, message } = await this.postService.findOne(+id);

    if (type) throw new HttpException(message, type);

    return message;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postService.remove(+id);
  // }
}
