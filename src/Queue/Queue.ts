import {Maybe} from '../Maybe';

export class Queue<T> {
  private list: Array<T> = [];

  enqueue(value: T) {
    this.list.push(value);
  }

  dequeue(): Maybe<T> {
    return this.list.shift();
  }

  peek(): Maybe<T> {
    return this.list[0];
  }

  isEmpty(): boolean {
    return this.list.length === 0;
  }

  *iter(): IterableIterator<T> {
    while(this.peek() !== undefined) {
      yield this.dequeue()!;
    }
  }
}
