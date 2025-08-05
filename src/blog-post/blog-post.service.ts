import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto) {
    return await this.blogPostRepository.save(createBlogPostDto);
  }

  async findAll() {
    return await this.blogPostRepository.find({
      relations: ['comments'],
      select: {
        comments: {
          id: true,
          content: true,
        },
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
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
}
