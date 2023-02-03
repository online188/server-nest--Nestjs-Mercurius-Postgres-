import { User } from '../../users/entities/user.entity';
import { Post } from './post.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Upvote extends BaseEntity {
  @PrimaryColumn()
  userId!: string;

  @ManyToOne((_to) => User, (user) => user.upvotes)
  user!: User;

  @PrimaryColumn()
  postId!: string;

  @ManyToOne((_to) => Post, (post) => post.upvotes)
  post!: Post;

  @Column()
  value!: number;
}
