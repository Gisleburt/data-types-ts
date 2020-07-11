import {Queue} from './Queue';
import {expect} from 'chai';

describe('Queue', () => {
  it('should allow you to enqueue and dequeue', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).to.equal(1);
    expect(queue.dequeue()).to.equal(2);
    expect(queue.dequeue()).to.equal(3);
    expect(queue.dequeue()).to.equal(undefined);
  });

  it('should allow you to peek at the first value', () => {
    const queue = new Queue();
    expect(queue.peek()).to.equal(undefined);

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.peek()).to.equal(1);
    expect(queue.peek()).to.equal(1);
    expect(queue.dequeue()).to.equal(1);
    expect(queue.peek()).to.equal(2);
  });

  it('should provide an iterator for itself', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const iter = queue.iter();
    expect(iter.next().value).to.equal(1);
    expect(iter.next().value).to.equal(2);
    expect(iter.next().value).to.equal(3);
    expect(iter.next().done).to.equal(true);
  });

  it('should queue falsey values', () => {
    const booleanQueue = new Queue();
    booleanQueue.enqueue(true);
    booleanQueue.enqueue(false);

    const booleanIter = booleanQueue.iter();
    expect(booleanIter.next().value).to.equal(true);
    expect(booleanIter.next().value).to.equal(false);
    expect(booleanIter.next().done).to.equal(true);

    const numberQueue = new Queue();
    numberQueue.enqueue(1);
    numberQueue.enqueue(0);

    const numberIter = numberQueue.iter();
    expect(numberIter.next().value).to.equal(1);
    expect(numberIter.next().value).to.equal(0);
    expect(numberIter.next().done).to.equal(true);
  });
});
