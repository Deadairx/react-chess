export class MessageBase<T> {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
