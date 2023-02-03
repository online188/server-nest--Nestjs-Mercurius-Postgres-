import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upvote } from './entities/Upvote';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Upvote])],
  providers: [PostService, PostResolver],
})
export class PostModule {}
