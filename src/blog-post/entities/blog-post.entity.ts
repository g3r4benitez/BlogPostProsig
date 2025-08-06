import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogComment } from './blog-comment.entity';

@Entity('blog_post')
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  total_coments: number;

  @OneToMany(() => BlogComment, (comment) => comment.blogPost)
  comments: BlogComment[];
}
