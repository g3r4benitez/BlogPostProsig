import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogComment } from './entities/comment.entity';
import { BlogPostService } from 'src/blog-post/blog-post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(BlogComment)
    private blogCommentRepository: Repository<BlogComment>,
    private blogPostService: BlogPostService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    let blogPost;
    try {
      blogPost = await this.blogPostService.findOne(
        createCommentDto.blogPostId,
      );
    } catch (e) {
      if (!blogPost) {
        throw new BadRequestException(
          `Blog post with id ${createCommentDto.blogPostId} not found`,
        );
      }
    }

    const comment = new BlogComment();
    comment.content = createCommentDto.content;
    comment.blogPost = blogPost;

    return await this.blogCommentRepository.save(comment);
  }

  async findAll() {
    return this.blogCommentRepository.find();
  }

  async findOne(id: number) {
    return await this.blogCommentRepository.findOne({ where: { id } });
  }
}
