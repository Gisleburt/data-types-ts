import {Maybe} from './Maybe';

export class Stack<T> {
  private list: Array<T> = [];

  push(value: T) {
    this.list.push(value);
  }

  pop(): Maybe<T> {
    return this.list.pop();
  }

  peek(): Maybe<T> {
    return this.list[this.list.length - 1];
  }

  *iter(): IterableIterator<T> {
    while(this.peek() !== undefined) {
      yield this.pop()!;
    }
  }
}
