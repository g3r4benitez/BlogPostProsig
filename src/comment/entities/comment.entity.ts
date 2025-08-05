import { BlogPost } from '../../blog-post/entities/blog-post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => BlogPost)
  @JoinColumn()
  blogPost: BlogPost;
}
