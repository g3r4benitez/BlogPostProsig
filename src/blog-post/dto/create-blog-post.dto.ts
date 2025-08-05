import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBlogPostDto {
  @ApiProperty({
    example: 'Title one for my first entry',
    description: 'The title of the blog post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    example:
      'rem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor vel arcu eu iaculis.',
    description: 'The content of the blog post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  content: string;
}
