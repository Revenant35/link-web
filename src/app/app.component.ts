import {Component, inject, OnInit} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  color: string;
  file?: {
    type: 'image' | 'video' | 'file';
    url: string | SafeUrl;
    name: string;
  };
}

@Component({
  selector: 'app-root',
  imports: [
    MatFormField,
    MatIcon,
    FormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);

  public messages: ChatMessage[] = [];
  public newMessage = '';
  public currentUser = '';
  public userColor = '';
  public selectedFile: File | null = null;
  public selectedFileType: string = '';
  public selectedFilePreview: string | SafeUrl = '';

  ngOnInit() {
    this.generateUserIdentity();
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

  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.selectedFileType = this.selectedFile.type.split('/')[0];

      if (this.selectedFileType === 'image') {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            this.selectedFilePreview = e.target.result as string;
          }
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
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
      };

      if (this.selectedFile) {
        const fileUrl = URL.createObjectURL(this.selectedFile);
        const safeUrl = this.sanitizer.bypassSecurityTrustUrl(fileUrl);

        message.file = {
          type: this.selectedFileType as 'image' | 'video' | 'file',
          url: safeUrl,
          name: this.selectedFile.name
        };
      }

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
