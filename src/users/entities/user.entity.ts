import { Field, ObjectType } from '@nestjs/graphql';
import { Upvote } from '../../post/entities/Upvote';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';

// import { Upvote } from './Upvote';

@ObjectType() //Chuyển từ typescript cho graphql tới graphql: @Field()
@Entity() // Chuyển từ typescript sang postgresql:	@Column()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the user' })
  id: string;

  // @Column('int')
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  @Column()
  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Column()
  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'username of the user' })
  username!: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'email of the user' })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  @Field(() => String, { description: 'role of the user' })
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany((_to) => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
