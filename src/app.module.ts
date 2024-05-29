import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './app.entity';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { UserFollowers } from './entities/user_followers.entity';
import { PostEntity } from './entities/post.entity';
import { PostModule } from './post/post.module';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test1',
      logging: true,
      entities: [TestEntity, User, PostEntity, UserFollowers],
      synchronize: true,
      migrationsRun: true,
    }),
    UsersModule,
    PostModule,
    TimelineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
