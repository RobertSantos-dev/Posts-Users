import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
// import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
