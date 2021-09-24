declare namespace API {
  type AckSuccess<T> = {
    success: true;
    data: T;
  };

  type AckError = {
    success: false;
    error: {
      statusCode: number;
      message: string[];
      error: string;
    };
  };

  type AckResponse<T> = AckSuccess<T> | AckError;
}
