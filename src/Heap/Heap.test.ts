import {CompareFn} from '../Compare';
import {expect} from 'chai';
import {Heap} from './Heap';

describe('Heap', () => {
  it('should be able to create a min heap', () => {
    const compareFn: CompareFn<number> = (a, b) => a - b; // What you'd use to sort an array ascending
    const minHeap = new Heap(compareFn);
    minHeap.push(3, 9, 8, 5, 4, 2, 6, 1, 7);
    const iter = minHeap.iter();
    expect(iter.next().value).to.equal(1);
    expect(iter.next().value).to.equal(2);
    expect(iter.next().value).to.equal(3);
    expect(iter.next().value).to.equal(4);
    expect(iter.next().value).to.equal(5);
    expect(iter.next().value).to.equal(6);
    expect(iter.next().value).to.equal(7);
    expect(iter.next().value).to.equal(8);
    expect(iter.next().value).to.equal(9);
    expect(iter.next().done).to.equal(true);
  });

  it('should be able to create a max heap', () => {
    const compareFn: CompareFn<number> = (a, b) => b - a; // What you'd use to sort an array descending
    const maxHeap = new Heap(compareFn);
    maxHeap.push(3, 9, 8, 5, 4, 2, 6, 1, 7);
    const iter = maxHeap.iter();
    expect(iter.next().value).to.equal(9);
    expect(iter.next().value).to.equal(8);
    expect(iter.next().value).to.equal(7);
    expect(iter.next().value).to.equal(6);
    expect(iter.next().value).to.equal(5);
    expect(iter.next().value).to.equal(4);
    expect(iter.next().value).to.equal(3);
    expect(iter.next().value).to.equal(2);
    expect(iter.next().value).to.equal(1);
    expect(iter.next().done).to.equal(true);
  });
});
