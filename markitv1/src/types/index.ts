export interface ConversionResponse {
  status: 'success' | 'error';
  markdown?: string;
  error?: string;
}

export interface FileStatus {
  name: string;
  status: 'pending' | 'converting' | 'completed' | 'error';
  markdown?: string;
  error?: string;
}