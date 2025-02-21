import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {ChatMessage, ChatMessageSubmittedEvent} from './models/message';
import {ChatInputComponent} from './chat-input/chat-input.component';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    ChatMessageComponent,
    ChatInputComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public messages: ChatMessage[] = [];

  public handleMessageSubmitted(event: ChatMessageSubmittedEvent) {
    this.messages.push(event.message);

    // Scroll to bottom after message is added
    setTimeout(() => {
      const container = document.querySelector('.chat-messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 0);
  }
}
