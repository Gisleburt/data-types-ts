import {expect} from 'chai';
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
    expect(stack.pop()).to.equal(1);
    expect(stack.peek()).to.equal(2);
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

  it('should stack falsey values', () => {
    const booleanStack = new Stack();
    booleanStack.push(true);
    booleanStack.push(false);

    const booleanIter = booleanStack.iter();
    expect(booleanIter.next().value).to.equal(false);
    expect(booleanIter.next().value).to.equal(true);
    expect(booleanIter.next().done).to.equal(true);

    const numberStack = new Stack();
    numberStack.push(1);
    numberStack.push(0);

    const numberIter = numberStack.iter();
    expect(numberIter.next().value).to.equal(0);
    expect(numberIter.next().value).to.equal(1);
    expect(numberIter.next().done).to.equal(true);
  });

  it('should know when the stack is empty', () => {
    const booleanStack = new Stack();

    expect(booleanStack.isEmpty()).to.be.true;
    booleanStack.push(true);
    booleanStack.push(false);
    expect(booleanStack.isEmpty()).to.be.false;

    const booleanIter = booleanStack.iter();
    expect(booleanIter.next().value).to.equal(false);
    expect(booleanIter.next().value).to.equal(true);
    expect(booleanIter.next().done).to.equal(true);

    expect(booleanStack.isEmpty()).to.be.true;
  });
});
