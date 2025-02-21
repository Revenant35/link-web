import {Attachment} from './attachment';
import {User} from './user';

export interface ChatMessage {
  id: number;
  sender: User;
  content: string;
  sent: Date;
  attachments: Attachment[];
}

export interface ChatMessageSubmittedEvent {
  message: ChatMessage;
}
