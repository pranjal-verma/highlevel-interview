import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { PostDTO } from './post.dto';
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

  async getUserPosts(userId: number[], options: any): Promise<PostEntity[]> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .where('post.userId IN (:...userId)', { userId });
    if (options && options.page && options.limit) {
      queryBuilder
        .offset((options.page - 1) * options.limit)
        .limit(options.limit);
    }
    const postsArr = await queryBuilder.orderBy('createdAt').getMany();

    return postsArr;
  }
}
