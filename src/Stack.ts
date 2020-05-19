import {LinkedList} from './LinkedList';
import {Maybe} from './Maybe';

export class Stack<T> {
  private list: LinkedList<T> = new LinkedList<T>();

  push(value: T) {
    this.list.prepend(value);
  }

  pop(): Maybe<T> {
    return this.list.take();
  }

  peek(): Maybe<T> {
    return this.list.peek();
  }

  *iter(): IterableIterator<T> {
    while(this.peek()) {
      yield this.pop()!;
    }
  }
}
