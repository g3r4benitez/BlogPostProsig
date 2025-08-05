import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogComment } from './entities/comment.entity';
import { BlogPostModule } from 'src/blog-post/blog-post.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogComment]), BlogPostModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
