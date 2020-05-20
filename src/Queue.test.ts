import {Queue} from './Queue';
import {expect} from "chai";

describe('Queue', () => {
  it('should allow you to enqueue and deque', () => {
    const queue = new Queue();
    queue.enque(1);
    queue.enque(2);
    queue.enque(3);

    expect(queue.deque()).to.equal(1);
    expect(queue.deque()).to.equal(2);
    expect(queue.deque()).to.equal(3);
    expect(queue.deque()).to.equal(undefined);
  });

  it('should allow you to peek at the first value', () => {
    const queue = new Queue();
    expect(queue.peek()).to.equal(undefined);

    queue.enque(1);
    queue.enque(2);
    queue.enque(3);

    expect(queue.peek()).to.equal(1);
    expect(queue.peek()).to.equal(1);
    expect(queue.deque()).to.equal(1);
    expect(queue.peek()).to.equal(2);
  });

  it('should provide an iterator for itself', () => {
    const queue = new Queue();
    queue.enque(1);
    queue.enque(2);
    queue.enque(3);

    const iter = queue.iter();
    expect(iter.next().value).to.equal(1);
    expect(iter.next().value).to.equal(2);
    expect(iter.next().value).to.equal(3);
    expect(iter.next().done).to.equal(true);
  });
});
