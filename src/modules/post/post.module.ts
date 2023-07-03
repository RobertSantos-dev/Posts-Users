import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { PrismaService } from 'src/db/prisma.service';
import { PostMiddleware } from './middlewares/post.middleware';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PostMiddleware)
      .forRoutes({ path: 'post', method: RequestMethod.POST });
  }
}
