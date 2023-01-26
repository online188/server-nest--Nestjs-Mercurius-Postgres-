import { Post } from '@nestjs/common';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Post } from './Post';
// import { Upvote } from './Upvote';

@ObjectType() //Chuyển từ typescript cho graphql tới graphql: @Field()
@Entity() // Chuyển từ typescript sang postgresql:	@Column()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the user' })
  userId: string;

  // @Column('int')
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  @Column()
  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Column()
  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Field(() => String, { description: 'username of the user' })
  @Column({ unique: true })
  username!: string;

  @Column()
  @Field(() => String, { description: 'email of the user' })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  @Field(() => String, { description: 'role of the user' })
  role: string;

  // @OneToMany(() => Post, (post) => post.user)
  // posts: Post[];

  // @OneToMany((_to) => Upvote, (upvote) => upvote.user)
  // upvotes: Upvote[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
