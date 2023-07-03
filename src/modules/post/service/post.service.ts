import { Injectable, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
// import { UpdatePostDto } from '../dto/update-post.dto';
import { PrismaService } from '../../../db/prisma.service';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        text: createPostDto.text,
        userId: createPostDto.userId,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number) {
    const newPost: Post = await this.prisma.post.findUnique({ where: { id } });

    if (!newPost) {
      return { type: HttpStatus.BAD_REQUEST, message: 'Post inexist' };
    }

    return { type: null, message: newPost };
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
