import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';

@Entity('blog_post')
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => Comment, (comment) => comment.blogPost, { cascade: true })
  comments: Comment[];
}
