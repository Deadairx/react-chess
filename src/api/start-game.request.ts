import { IsString } from 'class-validator';
import { MessageBase } from './message-base';

export class StartGameRequest extends MessageBase<StartGameRequest> {
  @IsString()
  public gameId: string = '';
}
