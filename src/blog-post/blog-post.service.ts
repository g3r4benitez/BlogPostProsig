import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { BlogComment } from './entities/blog-comment.entity';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
    @InjectRepository(BlogComment)
    private blogCommentRepository: Repository<BlogComment>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto) {
    return await this.blogPostRepository.save(createBlogPostDto);
  }

  async findAll() {
    return await this.blogPostRepository.find({
      select: {
        id: true,
        title: true,
        content: false,
        total_coments: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }

    return post;
  }

  async findOneWithComments(id: number): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({
      where: { id },
      relations: ['comments'],
      select: {
        comments: {
          id: true,
          content: true,
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }

    return post;
  }

  async createComment(
    blogPostId: number,
    createCommentDto: CreateBlogCommentDto,
  ) {
    const blogPost = await this.findOne(blogPostId);
    const comment = new BlogComment();
    comment.content = createCommentDto.content;
    comment.blogPost = blogPost;
    blogPost.total_coments += 1;
    await this.update(blogPostId, {
      total_coments: blogPost.total_coments,
    });

    return await this.blogCommentRepository.save(comment);
  }

  async update(id: number, updateBlogPostDto: UpdateBlogPostDto) {
    await this.blogPostRepository.update(id, updateBlogPostDto);
  }
}
