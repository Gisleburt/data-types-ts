import {Maybe} from './Maybe';
import {Queue} from './Queue';
import {Stack} from './Stack';

export class BinaryTree<T>  {
  protected tree: Array<T> = [];

  add(...items: Array<T>) {
    this.tree.push(...items);
  }

  containsDepthFirst(find: T): boolean {
    for (const value of this.depthFirstIter()) {
      if(find === value) {
        return true;
      }
    }
    return false;
  }

  containsBreadthFirst(find: T): boolean {
    for (const value of this.breadthFirstWithQueueIter()) {
      if(find === value) {
        return true;
      }
    }
    return false;
  }

  size(): number {
    return this.tree.length;
  }

  protected leftOfIndex(index: number): Maybe<number> {
    const childIndex = (2 * index) + 1;
    return childIndex < this.tree.length ? childIndex : undefined;
  }

  protected rightOfIndex(index: number): Maybe<number> {
    const childIndex = (2 * index) + 2;
    return childIndex < this.tree.length ? childIndex : undefined;
  }

  protected parentOfIndex(index: number): Maybe<number> {
    if(index > 0) {
      return Math.floor((index - 1) / 2);
    }
  }

  *breadthFirstWithQueueIter() {
    if (this.tree.length === 0) {
      return;
    }

    let queue = new Queue<number>();
    queue.enqueue(0);
    for (const current of queue.iter()) {
      const left = this.leftOfIndex(current as number);
      const right = this.rightOfIndex(current as number);
      left && queue.enqueue(left);
      right && queue.enqueue(right);
      yield this.tree[current as number];
    }
  }

  *depthFirstIter() {
    if (this.tree.length === 0) {
      return;
    }

    let stack = new Stack<number>();
    stack.push(0);
    for (const current of stack.iter()) {
      const left = this.leftOfIndex(current as number);
      const right = this.rightOfIndex(current as number);
      right && stack.push(right);
      left && stack.push(left);
      yield this.tree[current as number];
    }
  }

  *breadthFirstIter() {
    for (const node of this.tree) {
      yield node;
    }
  }
}
