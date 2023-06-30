import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { PrismaService } from '../db/prisma.service';
import { UserMiddleware } from './middlewares/user.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
