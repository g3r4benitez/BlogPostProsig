import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBlogCommentDto {
  @ApiProperty({
    example: 'This is a comment about a blog post',
    description: 'The content of the comment',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  content: string;
}
