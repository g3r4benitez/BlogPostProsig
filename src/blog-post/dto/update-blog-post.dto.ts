import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogPostDto } from './create-blog-post.dto';
import { BlogComment } from '../entities/blog-comment.entity';

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {
  title?: string;
  content?: string;
  total_coments?: number;
  comments?: BlogComment[];
}
