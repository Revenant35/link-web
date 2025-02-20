import {Component, computed, input, output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {
  Attachment,
  AttachmentsUploadedEvent,
  AttachmentType,
  ImagePreviewLoadedEvent
} from '../models/attachment';

export type AttachmentButtonType = 'media' | 'document';

@Component({
  selector: 'app-attachment-button',
    imports: [
        MatIcon,
        MatIconButton
    ],
  templateUrl: './attachment-button.component.html',
  styleUrl: './attachment-button.component.scss'
})
export class AttachmentButtonComponent {
  public type = input<AttachmentButtonType>();

  public attachmentsUploaded = output<AttachmentsUploadedEvent>();
  public imagePreviewLoaded = output<ImagePreviewLoadedEvent>();

  public icon = computed(() => {
    if (this.type() === 'media') {
      return 'image';
    } else {
      return 'attach_file';
    }
  });

  public fileFilters = computed(() => {
    if (this.type() === 'media') {
      return 'image/*, video/*, audio/*';
    } else {
      return '';
    }
  });

  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input || !input.files) {
      return;
    }

    const selectedFiles: Attachment[] = Array.from(input.files).map(file => {
      const id = Math.random().toString(36).substring(7);
      const type = this.parseAttachmentType(file);
      if (type === 'image') {
        this.loadImage(id, file);
      }
      return { id, name: file.name, file, type };
    })

    this.attachmentsUploaded.emit({attachments: selectedFiles});
  }

  private parseAttachmentType(file: File): AttachmentType {
    const rawType = file.type.split('/')[0];
    switch (rawType) {
      case 'image':
        return 'image';
      case 'video':
        return 'video';
      case 'audio':
        return 'audio';
      default:
        return 'document';
    }
  }

  private loadImage(id: string, file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.imagePreviewLoaded.emit({imageId: id, imagePreviewUrl: e.target.result as string});
      }
    };
    reader.readAsDataURL(file);
  }
}
