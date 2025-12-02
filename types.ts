export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface UploadedImage {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

export interface VQAResponse {
  answer: string;
}