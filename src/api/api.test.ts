import { deserialize, serialize } from 'class-transformer';
import {
  MakeMoveRequest,
  MakeMoveResponse,
  StartGameRequest,
  StartGameResponse,
} from '.';

describe('API', () => {
  describe('Request', () => {
    it.each([[StartGameRequest], [MakeMoveRequest]])(
      "request '%s' survives round-trip serialization",
      (Metatype) => {
        const request = new Metatype({});

        const json = serialize(request);
        const copy = deserialize(Metatype, json);

        expect(request).toEqual(copy);
        expect(request).toBeInstanceOf(Metatype);
        expect(copy).toBeInstanceOf(Metatype);
      }
    );
  });

  describe('Response', () => {
    it.each([[StartGameResponse], [MakeMoveResponse]])(
      "request '%s' survives round-trip serialization",
      (Metatype) => {
        const request = new Metatype({});

        const json = serialize(request);
        const copy = deserialize(Metatype, json);

        expect(request).toEqual(copy);
        expect(request).toBeInstanceOf(Metatype);
        expect(copy).toBeInstanceOf(Metatype);
      }
    );
  });
});
