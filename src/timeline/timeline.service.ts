import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { UserFollowers } from 'src/entities/user_followers.entity';
import { PostService } from 'src/post/post.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UserFollowersDto } from './timeline.dto';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(UserFollowers)
    private userFollowersRepository: Repository<UserFollowers>,
    private userService: UsersService,
    private postService: PostService,
  ) {}

  async follow(userFollowers: UserFollowersDto) {
    const follows = new UserFollowers();
    const userFollowrs = await this.userFollowersRepository
      .createQueryBuilder()
      .where('userId = :userId AND followerId = :followerId ', {
        userId: userFollowers.userId,
        followerId: userFollowers.followerId,
      })
      .getOne();
    if (userFollowrs != null) {
      throw new HttpException('Already following', 400);
    }
    follows.user = await this.userService.getUser(userFollowers.userId);
    follows.follower = await this.userService.getUser(userFollowers.followerId);
    await this.userFollowersRepository.save(follows);
  }

  // getTimeline method gets the timeline of a user based on the user ID, page, and limit.
  // Its kept absatracted away from user logic so that if can be moved to a noSQL database in the future.
  async getTimeline(
    userID: number,
    page: number,
    limit: number,
  ): Promise<PostEntity[]> {
    const followers = await this.userFollowersRepository
      .createQueryBuilder('userFollowers')
      .leftJoinAndSelect('userFollowers.user', 'user')
      .where('userFollowers.followerId = :userId', { userId: userID })
      .getMany();

    console.log('followers', followers);
    const followerIds = followers.map((follower) => follower.user.id);
    if (followerIds.length === 0) {
      return [];
    }
    const posts = await this.postService.getUserPosts(followerIds, {
      page: page !== 0 ? page : null,
      limit: limit !== 0 ? limit : null,
    });

    return posts;
  }
}
