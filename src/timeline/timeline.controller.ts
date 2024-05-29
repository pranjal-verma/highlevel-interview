import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { UserFollowersDto } from './timeline.dto';
import { PostResponseDto } from 'src/post/post.dto';
import { plainToClass } from 'class-transformer';

@Controller('timeline')
export class TimelineController {
  constructor(private timelineService: TimelineService) {}

  @HttpCode(HttpStatus.OK)
  @Post('follow/:userID')
  async followUser(
    @Param('userID') userID: number,
    @Query('followerId') followerID: number,
  ) {
    const userFollower: UserFollowersDto = {
      userId: userID,
      followerId: followerID,
    };
    console.log('userFollowerDTO', userFollower);
    await this.timelineService.follow(userFollower);
    return;
  }

  @Post()
  async getTimeline(
    @Query('userId') userID: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<PostResponseDto[]> {
    const posts = await this.timelineService.getTimeline(userID, page, limit);
    return posts?.map((post) => {
      return plainToClass(PostResponseDto, post);
    });
  }
}
