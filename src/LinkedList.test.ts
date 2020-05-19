import {LinkedList, ListNode} from './LinkedList';
import { expect } from 'chai';

describe('LinkedList', () => {
  it('should prepend values to the start of the list', () => {
    const linkedList = new LinkedList();
    linkedList.prepend(3);
    linkedList.prepend(2);
    linkedList.prepend(1);

    const iterator = linkedList.iter();
    expect(iterator.next().value).to.equal(1);
    expect(iterator.next().value).to.equal(2);
    expect(iterator.next().value).to.equal(3);
    expect(iterator.next().done).to.equal(true);
  });

  it('should append values to the start of the list', () => {
    const linkedList = new LinkedList();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    const iterator = linkedList.iter();
    expect(iterator.next().value).to.equal(1);
    expect(iterator.next().value).to.equal(2);
    expect(iterator.next().value).to.equal(3);
    expect(iterator.next().done).to.equal(true);
  });

  it('should be able to detect loops', () => {
    const linkedList = new LinkedList();
    let node1 = new ListNode(1);
    let node2 = new ListNode(2, node1);
    let node3 = new ListNode(3, node2);
    let node4 = new ListNode(3, node3);
    (linkedList as any).setHead(node4);

    expect(linkedList.hasLoop()).to.equal(false);

    node1.append(node3);
    expect(linkedList.hasLoop()).to.equal(true);
  })

  it('should be able to find a value in the list', () => {
    const linkedList = new LinkedList();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.contains(2)).to.equal(true);
    expect(linkedList.contains(4)).to.equal(false);
  });

  it('should allow you to insert a value after another', () => {
    const linkedList = new LinkedList();
    linkedList.append('H');
    linkedList.append('E');
    linkedList.append('L');
    linkedList.append('O');

    linkedList.insertAfter('E', 'L');
    expect(Array.from(linkedList.iter()).join('')).to.equal('HELLO');
  });

  it('should throw an error if trying to insert a value after one that is not in the list', () => {
    const linkedList = new LinkedList();
    linkedList.append('H');
    linkedList.append('E');
    linkedList.append('L');
    linkedList.append('O');

    expect(() => linkedList.insertAfter('G', 'L')).to.throw();
  });

  it('should allow you to insert a value before another', () => {
    const linkedList = new LinkedList();
    linkedList.append('H');
    linkedList.append('E');
    linkedList.append('L');
    linkedList.append('O');

    linkedList.insertBefore('L', 'L');
    expect(Array.from(linkedList.iter()).join('')).to.equal('HELLO');
  });

  it('should throw an error if trying to insert a value before one that is not in the list', () => {
    const linkedList = new LinkedList();
    linkedList.append('H');
    linkedList.append('E');
    linkedList.append('L');
    linkedList.append('O');

    expect(() => linkedList.insertBefore('G', 'L')).to.throw();
  });

  it('should allow you to remove a value', () => {
    const linkedList = new LinkedList();
    linkedList.append('H');
    linkedList.append('E');
    linkedList.append('L');
    linkedList.append('L');
    linkedList.append('O');

    linkedList.removeFirst('L');
    expect(Array.from(linkedList.iter()).join('')).to.equal('HELO');

    linkedList.removeFirst('H');
    expect(Array.from(linkedList.iter()).join('')).to.equal('ELO');

    linkedList.removeFirst('O');
    expect(Array.from(linkedList.iter()).join('')).to.equal('EL');
  });

  it('should allow you all values', () => {
    const linkedList = new LinkedList();
    linkedList.append('H');
    linkedList.append('E');
    linkedList.append('L');
    linkedList.append('L');
    linkedList.append('O');

    linkedList.removeAll('L');
    expect(Array.from(linkedList.iter()).join('')).to.equal('HEO');

    linkedList.removeAll('H');
    expect(Array.from(linkedList.iter()).join('')).to.equal('EO');

    linkedList.removeAll('O');
    expect(Array.from(linkedList.iter()).join('')).to.equal('E');
  });
});
