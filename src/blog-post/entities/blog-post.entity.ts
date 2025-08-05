import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogComment } from '../../comment/entities/comment.entity';

@Entity('blog_post')
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => BlogComment, (comment) => comment.blogPost, {
    cascade: true,
  })
  comments: BlogComment[];
}
