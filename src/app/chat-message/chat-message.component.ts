import {Component, input} from '@angular/core';
import {ChatMessage} from '../models/message';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat-message',
  imports: [
    DatePipe
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  public isOwnMessage = input<boolean>(true);
  public message = input.required<ChatMessage>();
}
