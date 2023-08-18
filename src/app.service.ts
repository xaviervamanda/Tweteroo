import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  createUser(body: CreateUserDto){
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  createTweet(body: CreateTweetDto){
    const user = this.users.find(user => user.username === body.username);
    if (!user) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED); 
    const tweet = new Tweet({ username: user.username, avatar: user.avatar}, body.tweet);
    return this.tweets.push(tweet);
  }
}
