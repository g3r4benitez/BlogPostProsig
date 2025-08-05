import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  content: string;
}
