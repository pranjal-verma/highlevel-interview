import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Post()
  async createPost(@Body() post: any) {
    const savedPost = await this.postService.createPost(post);
    return { id: savedPost.id };
  }

  @Get()
  async getUserPosts(@Query('userId') userId: number) {
    const posts = await this.postService.getUserPosts([userId], null);
    return posts;
  }
}
