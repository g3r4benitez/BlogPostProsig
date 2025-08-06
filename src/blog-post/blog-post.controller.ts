import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';

@Controller('post')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post()
  create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogPostService.create(createBlogPostDto);
  }

  @Get()
  findAll() {
    return this.blogPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogPostService.findOneWithComments(+id);
  }

  @Post(':id/comment')
  createComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateBlogCommentDto,
  ) {
    console.log(+id);
    return this.blogPostService.createComment(+id, createCommentDto);
  }
}
