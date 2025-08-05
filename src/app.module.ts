import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [BlogPostModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
