export type AttachmentType = 'image' | 'video' | 'audio' | 'document';
export type Attachment = {
  id: string;
  name: string;
  file: File;
  type: AttachmentType;
  isLoadingImagePreview?: boolean;
  imagePreviewUrl?: string;
}

export type AttachmentsUploadedEvent = {
  attachments: Attachment[];
}

export type ImagePreviewLoadedEvent = {
  imageId: string;
  imagePreviewUrl: string;
}
