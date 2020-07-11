import {Maybe} from '../Maybe';
import {Queue} from '../Queue/Queue';
import {Stack} from '../Stack/Stack';
import {CompareFn} from '../Compare';

export class BinaryTree<T> {
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

  optimise(compareFn: CompareFn<T>): BinarySearchTree<T> {
    return new BinarySearchTree(this, compareFn);
  }
}


export class BinarySearchTree<T> extends BinaryTree<T> {
  public constructor(binary_tree: BinaryTree<T>, private compareFn: CompareFn<T>) {
    super();
    this.tree = [...(binary_tree as any).tree];
    this.sort();
  }

  sort(): void {
    if (this.tree.length === 0) {
      return;
    }

    this.tree.sort(this.compareFn);
    const newTree = [];
    const queueOfSplits = new Queue<Array<T>>();
    queueOfSplits.enqueue(this.tree)

    while (queueOfSplits.peek() !== undefined) {
      const nextArrayPart = queueOfSplits.dequeue() as Array<T>;
      const centerPoint = Math.floor(nextArrayPart.length / 2);
      newTree.push(nextArrayPart[centerPoint]);
      if(centerPoint > 0) {
        let left = nextArrayPart.slice(0, centerPoint);
        queueOfSplits.enqueue(left);
      }
      if(centerPoint + 1 < nextArrayPart.length) {
        let right = nextArrayPart.slice(centerPoint + 1);
        queueOfSplits.enqueue(right);
      }
    }

    this.tree = newTree;
  }

  public add(...items: T[]): void {
    super.add(...items);
    this.sort();
  }

  public contains(item: T): boolean {
    if (this.tree.length === 0) {
      return false
    }

    let currentNode: Maybe<number> = 0;
    while(currentNode !== undefined) {
      if (this.tree[currentNode] === item) { // Found it
        return true;
      }
      if (this.tree[currentNode] > item) { // current node bigger, go left
        currentNode = this.leftOfIndex(currentNode);
      } else {
        currentNode = this.rightOfIndex(currentNode) // current node smaller, go right
      }
    }
    return false;
  }
}
