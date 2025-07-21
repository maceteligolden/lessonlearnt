export type UploadState = {
  loading: boolean;
  response: string | null;
  error: string | null;
};

export type UploadAction =
  | { type: 'START_LOADING' }
  | { type: 'SET_RESPONSE'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };
