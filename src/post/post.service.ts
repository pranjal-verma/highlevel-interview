import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { PostDTO } from './post.dto'; // Add this line
// import { User } from 'src/entities/user.entity';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async createPost(post: PostDTO): Promise<PostEntity> {
    const postEntity = this.postRepository.create(post);
    console.log('post', postEntity);
    return await this.postRepository.save(postEntity);
  }

  // Return all posts of a user
  async getUserPosts(userId: number): Promise<PostEntity[]> {
    const postsArr = this.postRepository
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .execute();

    return postsArr;
  }
}
