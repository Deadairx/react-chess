import { IsString } from 'class-validator';
import { MessageBase } from './message-base';

export class MakeMoveRequest extends MessageBase<MakeMoveRequest> {
  @IsString()
  public move: string = '';

  @IsString()
  public gameId: string = '';
}
