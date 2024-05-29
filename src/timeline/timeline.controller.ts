import { Controller, Param, Post } from '@nestjs/common';
import { PostEntity } from 'src/entities/post.entity';
import { TimelineService } from './timeline.service';

@Controller('timeline')
export class TimelineController {
  constructor(private timelineService: TimelineService) {}
  @Post()
  followUser(@Param() userID: number, followerID: number) {
    this.timelineService.follow(userID, followerID);
  }

  @Post()
  async getTimeline(@Param() userID: number): Promise<PostEntity> {
    return null;
  }
}
