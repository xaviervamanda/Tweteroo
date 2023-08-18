import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/sign-up")
  @HttpCode(200)
  signUp (@Body() body: CreateUserDto) {
    return this.appService.createUser(body);
  }

  @Post("/tweets")

  createTweet(@Body() body: CreateTweetDto) {
    try {
      return this.appService.createTweet(body);
    } catch (error){
      throw error;
    }
  }
}

