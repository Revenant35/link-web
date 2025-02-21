import {Injectable, Signal, signal} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public adjectives = ['Happy', 'Lucky', 'Sunny', 'Clever', 'Swift', 'Brave', 'Bright'];
  public nouns = ['Panda', 'Fox', 'Eagle', 'Dolphin', 'Tiger', 'Lion', 'Wolf'];

  public user: Signal<User>;

  constructor() {
    this.user = signal(this.generateUserIdentity());
  }

  private generateUserIdentity(): User {
    return {name: this.generateRandomName(), color: this.generateRandomColor()};
  }

  private generateRandomName() {
    const randomAdjective = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
    const randomNoun = this.nouns[Math.floor(Math.random() * this.nouns.length)];

    return `${randomAdjective}${randomNoun}`;
  }

  private generateRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 35%)`;
  }
}
