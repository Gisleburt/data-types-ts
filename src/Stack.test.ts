import {expect} from "chai";
import {Stack} from './Stack';

describe('Stack', () => {
  it('should push and pop values', () => {
    const stack = new Stack();
    stack.push(3);
    stack.push(2);
    stack.push(1);

    expect(stack.pop()).to.equal(1);
    expect(stack.pop()).to.equal(2);
    expect(stack.pop()).to.equal(3);
    expect(stack.pop()).to.equal(undefined);

  });

  it('should allow you to peek at the first value', () => {
    const stack = new Stack();
    expect(stack.peek()).to.equal(undefined);

    stack.push(3);
    stack.push(2);
    stack.push(1);

    expect(stack.peek()).to.equal(1);
    expect(stack.peek()).to.equal(1);
  });

  it('should provide an iterator for itself', () => {
    const stack = new Stack();
    stack.push(3);
    stack.push(2);
    stack.push(1);

    const iter = stack.iter();
    expect(iter.next().value).to.equal(1);
    expect(iter.next().value).to.equal(2);
    expect(iter.next().value).to.equal(3);
    expect(iter.next().done).to.equal(true);
  });
});
