import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }
  createUser(body: CreateUserDto){
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  createTweet(body: CreateTweetDto){
    const user = this.users.find(user => user.username === body.username);
    console.log(user);
    if (!user) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED); 
    const tweet = new Tweet({ username: user.username, avatar: user.avatar}, body.tweet);
    console.log(tweet);
    return this.tweets.push(tweet);
  }

  listTweets(page: string){
    const pageN = Number(page);
    if (pageN < 1) throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST);
    if (!page) {
      const tweets = this.tweets.reverse();
      return tweets.slice(0, 15);
    }
    const startIndex = (pageN - 1)*15;
    const endIndex = startIndex + 15;
    const tweets = this.tweets.reverse();
    return tweets.slice(startIndex, endIndex);
  }

  listUserTweets(username: string){
    return this.tweets.filter(tweet => tweet.username === username);
  }
}
