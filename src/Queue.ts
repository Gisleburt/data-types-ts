import {Maybe} from './Maybe';

export class Queue<T> {
  private list: Array<T> = [];

  enque(value: T) {
    this.list.push(value);
  }

  deque(): Maybe<T> {
    return this.list.shift();
  }

  peek(): Maybe<T> {
    return this.list[0];
  }

  *iter(): IterableIterator<T> {
    while(this.peek()) {
      yield this.deque()!;
    }
  }
}
