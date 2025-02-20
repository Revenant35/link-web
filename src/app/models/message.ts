import {Attachment} from './attachment';

export interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  color: string;
  sent: Date;
  attachments: Attachment[];
}
