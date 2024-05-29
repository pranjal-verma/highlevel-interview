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
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mydatabase',
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
