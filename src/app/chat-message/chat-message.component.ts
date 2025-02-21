import {Component, computed, inject, input} from '@angular/core';
import {ChatMessage} from '../models/message';
import {DatePipe} from '@angular/common';
import {UserService} from '../services/user.service';
import {UsernamePipe} from '../pipes/username.pipe';

@Component({
  selector: 'app-chat-message',
  imports: [
    DatePipe,
    UsernamePipe
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  private readonly userService = inject(UserService);

  public message = input.required<ChatMessage>();

  public isOwnMessage = computed(() => {
    return this.message().sender.name === this.userService.user().name;
  });
}
