import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostEntity } from 'src/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
