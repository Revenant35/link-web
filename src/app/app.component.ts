import {Component, OnInit} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {MatFormField, MatPrefix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AttachmentButtonComponent} from './attachment-button/attachment-button.component';
import {Attachment, AttachmentsUploadedEvent, ImagePreviewLoadedEvent} from './models/attachment';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {ChatMessage} from './models/message';

@Component({
  selector: 'app-root',
  imports: [
    MatFormField,
    MatIcon,
    FormsModule,
    MatInput,
    MatButton,
    MatIconButton,
    MatPrefix,
    AttachmentButtonComponent,
    ChatMessageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public messages: ChatMessage[] = [];
  public newMessage = '';
  public currentUser = '';
  public userColor = '';
  public attachments: Attachment[] = [];
  public selectedFile: File | null = null;
  public selectedFileType: string = '';
  public selectedFilePreview: string | SafeUrl = '';

  ngOnInit() {
    this.generateUserIdentity();
  }

  handleAttachmentsUploaded(event: AttachmentsUploadedEvent) {
    this.attachments.push(...event.attachments);
  }

  handleImagePreviewLoaded(event: ImagePreviewLoadedEvent) {
    const attachment = this.attachments.find(a => a.id === event.imageId);
    if (attachment) {
      attachment.url = event.imagePreviewUrl;
    }
  }

  generateUserIdentity() {
    const adjectives = ['Happy', 'Lucky', 'Sunny', 'Clever', 'Swift', 'Brave', 'Bright'];
    const nouns = ['Panda', 'Fox', 'Eagle', 'Dolphin', 'Tiger', 'Lion', 'Wolf'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    this.currentUser = `${randomAdjective}${randomNoun}`;
    this.userColor = this.generateRandomColor();
  }

  generateRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 35%)`; // Using HSL for better readability
  }

  removeSelectedFile() {
    this.selectedFile = null;
    this.selectedFileType = '';
    this.selectedFilePreview = '';
  }

  sendMessage() {
    if (this.newMessage.trim() || this.selectedFile) {
      const message: ChatMessage = {
        id: Date.now(),
        sender: this.currentUser,
        content: this.newMessage.trim(),
        color: this.userColor,
        attachments: this.attachments,
        sent: new Date()
      };

      this.messages.push(message);
      this.newMessage = '';
      this.removeSelectedFile();

      // Scroll to bottom after message is added
      setTimeout(() => {
        const container = document.querySelector('.chat-messages');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 0);
    }
  }
}
