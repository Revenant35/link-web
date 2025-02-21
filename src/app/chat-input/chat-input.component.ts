import {Component, computed, inject, output, signal} from '@angular/core';
import {AttachmentButtonComponent} from "../attachment-button/attachment-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ChatMessageSubmittedEvent} from '../models/message';
import {Attachment, AttachmentsUploadedEvent, ImagePreviewLoadedEvent} from '../models/attachment';
import {UserService} from '../services/user.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-chat-input',
  imports: [
    AttachmentButtonComponent,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatPrefix,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  private readonly userService = inject(UserService);

  public messageSubmitted = output<ChatMessageSubmittedEvent>();

  protected message = signal('');
  protected attachments = signal<Attachment[]>([]);

  canSubmit = computed(() => {
    return this.message().trim() !== '' || this.attachments().length > 0;
  });

  submitMessage() {
    if (!this.canSubmit()) {
      return;
    }

    const message = {
      id: Math.random(),
      sender: this.userService.user(),
      content: this.message().trim(),
      sent: new Date(),
      attachments: this.attachments(),
    };

    this.messageSubmitted.emit({message: message});

    this.message.set('');
    this.attachments.set([]);
  }

  handleAttachmentsUploaded(event: AttachmentsUploadedEvent) {
    this.attachments.update(attachments => [...attachments, ...event.attachments]);
  }

  handleImagePreviewLoaded(event: ImagePreviewLoadedEvent) {
    const attachment = this.attachments().find(a => a.id === event.imageId);
    if (attachment) {
      attachment.url = event.imagePreviewUrl;
    }
  }
}
