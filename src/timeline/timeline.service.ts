import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { UserFollowers } from 'src/entities/user_followers.entity';
import { PostService } from 'src/post/post.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(UserFollowers)
    private userFollowersRepository: Repository<UserFollowers>,
    private userService: UsersService,
    private postService: PostService,
  ) {}

  async follow(userID: number, followeId: number) {
    return this.userService.follow(userID, followeId);
  }

  async getTimeline(userID: number): Promise<PostEntity[]> {
    // const followers = this.userFollowersRepository.find({
    //   where: { follower_id: userID },
    // });
    console.log('userID', userID);
    // get post where created by is equal to followers
    return null;
  }
}
