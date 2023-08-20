import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHealth(): string {
    return this.appService.getHealth();
  }

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
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get("/tweets")

  listTweets(@Query('page') page: string) {
    return this.appService.listTweets(page);
  }

  @Get("/tweets/:username")

  listUserTweets(@Param('username') username: string) {
    return this.appService.listUserTweets(username);
  }
}

