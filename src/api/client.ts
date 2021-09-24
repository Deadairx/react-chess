import { ShortMove } from 'chess.js';
import { validate } from 'class-validator';
import { Socket } from 'socket.io-client';
// import { MakeMoveRequest } from './make-move.request';
import { MakeMoveResponse } from './make-move.response';
import { StartGameRequest } from './start-game.request';
import { StartGameResponse } from './start-game.response';

class ApiError extends Error {
  constructor(
    public readonly error: string,
    public readonly details: string[],
    public readonly statusCode: number
  ) {
    super(`[${error}] ${details[0]}`);
  }

  public static fromResponse(response: API.AckError): ApiError {
    return new ApiError(
      response.error.error,
      response.error.message,
      response.error.statusCode
    );
  }
}

const transformAck =
  <T>(resolve: (result: T) => void, reject: (error: Error) => void) =>
  (response: API.AckResponse<T>) => {
    response.success
      ? resolve(response.data)
      : reject(ApiError.fromResponse(response));
  };

export class ChessClient {
  constructor(private readonly socket: Socket) {}

  public makeMove(move: ShortMove): Promise<MakeMoveResponse> {
    return new Promise((resolve, reject) => {
      validate(move).then((errors) => {
        if (errors.length > 0) {
          return reject(
            new ApiError(
              'Bad Request',
              errors.map((e) => e.toString()),
              500
            )
          );
        }

        this.socket.emit(
          'game:make-move',
          move,
          transformAck(resolve, reject)
        );
      });
    });
  }

  public startGame(request: StartGameRequest): Promise<StartGameResponse> {
    return new Promise((resolve, reject) => {
      validate(request).then((errors) => {
        if (errors.length > 0) {
          return reject(
            new ApiError(
              'Bad Request',
              errors.map((e) => e.toString()),
              500
            )
          );
        }

        this.socket.emit(
          'game:start-game',
          request,
          transformAck(resolve, reject)
        );
      });
    });
  }
}
