class ApiError extends Error { // extends Error?
  status: number;
  message: string;

  constructor (status: number, message: string) {
    super(); // ?
    this.status = status;
    this.message = message;
  }

  static internal (message: string): ApiError {
    return new ApiError(500, message);
  }

  static notFound (message: string): ApiError {
    return new ApiError(404, message);
  }

  static forbidden (message: string): ApiError {
    return new ApiError(403, message);
  }

  static unauthorized (message: string): ApiError {
    return new ApiError(401, message);
  }

  static badRequest (message: string): ApiError {
    return new ApiError(400, message);
  }
}

export default ApiError;
