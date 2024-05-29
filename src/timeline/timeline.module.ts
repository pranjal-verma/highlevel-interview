import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { UsersModule } from 'src/users/users.module';
import { PostModule } from 'src/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollowers } from 'src/entities/user_followers.entity';

@Module({
  providers: [TimelineService],
  controllers: [TimelineController],
  imports: [UsersModule, PostModule, TypeOrmModule.forFeature([UserFollowers])],
})
export class TimelineModule {}
