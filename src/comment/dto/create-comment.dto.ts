import { ApiProperty } from "@nestjs/swagger";
import { IsInstance, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'This is a comment about a blog post',
    description: 'The content of the comment',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  content: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the blog post associated with the comment',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  blogPostId: number;
}
