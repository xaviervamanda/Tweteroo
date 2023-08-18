import { User } from 'src/entities/user.entity';

export class Tweet extends User {
    user: User;
    tweet: string;
    constructor(user: User, tweet: string) {
        super(user.username, user.avatar);
        this.tweet = tweet;
    }
}