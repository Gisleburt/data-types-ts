import {CompareFn} from '../Compare';
import {BinaryTree} from '../BinaryTree/BinaryTree';
import {Maybe} from '../Maybe';

export class Heap<T> extends BinaryTree<T> {
  constructor(protected compareFn: CompareFn<T>) {
    super()
  }

  protected swap(i1: number, i2: number) {
    const temp = this.tree[i1];
    this.tree[i1] = this.tree[i2];
    this.tree[i2] = temp;

  }

  protected bubbleUp(index: number) {
    const parent = this.parentOfIndex(index);
    if (parent !== undefined && this.compareFn(this.tree[index], this.tree[parent]) < 0) {
      this.swap(index, parent);
      this.bubbleUp(parent);
    }
  }

  protected bubbleDown(index: number = 0) {
    const swapAndBubbleDown = (newIndex: number) => {
      this.swap(index, newIndex);
      this.bubbleDown(newIndex);
    }

    const left = this.leftOfIndex(index);
    const right = this.rightOfIndex(index);

    const isSmallerThanLeft = left !== undefined && this.compareFn(this.tree[left], this.tree[index]) < 0;
    const isSmallerThanRight = right !== undefined && this.compareFn(this.tree[right], this.tree[index]) < 0;
    const isSmallerThanBoth = isSmallerThanLeft && isSmallerThanRight;

    if(isSmallerThanBoth) {
      const smaller = this.compareFn(this.tree[left!], this.tree[right!]) < 0 ? left : right;
      return swapAndBubbleDown(smaller!);
    }
    if(isSmallerThanLeft) {
      return swapAndBubbleDown(left!);
    }
    if(isSmallerThanRight) {
      return swapAndBubbleDown(right!);
    }
  }

  push(...values: Array<T>) {
    for (const value of values) {
      this.tree.push(value);
      this.bubbleUp(this.tree.length - 1); // Bubble last entry
    }
  }

  pop(): Maybe<T> {
    if(this.tree.length > 0) {
      this.swap(0, this.tree.length - 1);
      const value = this.tree.pop();
      this.bubbleDown();
      return value;
    }
  }

  *iter(): IterableIterator<T> {
    while(this.tree.length > 0) {
      yield this.pop() as T;
    }
  }
}
