export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | null;
  statusCode: number;
}

export interface SuccessResponse<T> extends ApiResponse<T> {
  success: true;
  data: T;
  error?: never;
}

export interface ErrorReponse extends ApiResponse {
  success: false;
  data?: never;
  error?: string;
}
