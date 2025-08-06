import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogPost } from './blog-post.entity';

@Entity('comment')
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.comments)
  @JoinColumn({ name: 'blogPostId' })
  blogPost: BlogPost;
}