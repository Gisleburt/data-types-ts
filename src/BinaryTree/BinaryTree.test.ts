import { BinaryTree } from './BinaryTree';
import { expect } from 'chai';

describe('BinaryTree', () => {
  it('should add new items', () => {
    const binaryTree = new BinaryTree();
    expect(binaryTree.size()).to.equal(0);
    binaryTree.add(1);
    binaryTree.add(2);
    binaryTree.add(3);
    expect(binaryTree.size()).to.equal(3);
  });

  //     1
  //  2     3
  // 4 5   6 7

  it('should iterate through breadth first', () => {
    const binaryTree = new BinaryTree();
    const iter1 = binaryTree.breadthFirstIter();
    expect(iter1.next().done).to.equal(true);
    binaryTree.add(1, 2, 3, 4, 5, 6, 7);
    const iter2 = binaryTree.breadthFirstIter();
    expect(iter2.next().value).to.equal(1);
    expect(iter2.next().value).to.equal(2);
    expect(iter2.next().value).to.equal(3);
    expect(iter2.next().value).to.equal(4);
    expect(iter2.next().value).to.equal(5);
    expect(iter2.next().value).to.equal(6);
    expect(iter2.next().value).to.equal(7);
    expect(iter2.next().done).to.equal(true);
  });

  it('should iterate through breadth first the proper way', () => {
    const binaryTree = new BinaryTree();
    const iter1 = binaryTree.breadthFirstWithQueueIter();
    expect(iter1.next().done).to.equal(true);
    binaryTree.add(1, 2, 3, 4, 5, 6, 7);
    const iter2 = binaryTree.breadthFirstWithQueueIter();
    expect(iter2.next().value).to.equal(1);
    expect(iter2.next().value).to.equal(2);
    expect(iter2.next().value).to.equal(3);
    expect(iter2.next().value).to.equal(4);
    expect(iter2.next().value).to.equal(5);
    expect(iter2.next().value).to.equal(6);
    expect(iter2.next().value).to.equal(7);
    expect(iter2.next().done).to.equal(true);
  });

  it('should iterate through depth first', () => {
    const binaryTree = new BinaryTree();
    const iter1 = binaryTree.depthFirstIter();
    expect(iter1.next().done).to.equal(true);
    binaryTree.add(1, 2, 3, 4, 5, 6, 7);
    const iter2 = binaryTree.depthFirstIter();
    expect(iter2.next().value).to.equal(1);
    expect(iter2.next().value).to.equal(2);
    expect(iter2.next().value).to.equal(4);
    expect(iter2.next().value).to.equal(5);
    expect(iter2.next().value).to.equal(3);
    expect(iter2.next().value).to.equal(6);
    expect(iter2.next().value).to.equal(7);
    expect(iter2.next().done).to.equal(true);
  });

  it('should find values', () => {
    const binaryTree = new BinaryTree();
    binaryTree.add(1, 2, 3, 4, 5, 6, 7);
    expect(binaryTree.containsBreadthFirst(1)).to.equal(true);
    expect(binaryTree.containsBreadthFirst(2)).to.equal(true);
    expect(binaryTree.containsBreadthFirst(3)).to.equal(true);
    expect(binaryTree.containsBreadthFirst(4)).to.equal(true);
    expect(binaryTree.containsBreadthFirst(5)).to.equal(true);
    expect(binaryTree.containsBreadthFirst(6)).to.equal(true);
    expect(binaryTree.containsBreadthFirst(7)).to.equal(true);
    expect(binaryTree.containsBreadthFirst(8)).to.equal(false);

    expect(binaryTree.containsDepthFirst(1)).to.equal(true);
    expect(binaryTree.containsDepthFirst(2)).to.equal(true);
    expect(binaryTree.containsDepthFirst(3)).to.equal(true);
    expect(binaryTree.containsDepthFirst(4)).to.equal(true);
    expect(binaryTree.containsDepthFirst(5)).to.equal(true);
    expect(binaryTree.containsDepthFirst(6)).to.equal(true);
    expect(binaryTree.containsDepthFirst(7)).to.equal(true);
    expect(binaryTree.containsDepthFirst(8)).to.equal(false);
  });

  it('should be sortable', () => {
    //     4
    //  2     6
    // 1 3   5 7

    const binaryTree = new BinaryTree<number>();
    binaryTree.add(3, 2, 4, 6, 1, 7, 5);
    const sortedTree = binaryTree.optimise((a, b) => (a - b));

    const iter = sortedTree.breadthFirstIter();
    expect(iter.next().value).to.equal(4);
    expect(iter.next().value).to.equal(2);
    expect(iter.next().value).to.equal(6);
    expect(iter.next().value).to.equal(1);
    expect(iter.next().value).to.equal(3);
    expect(iter.next().value).to.equal(5);
    expect(iter.next().value).to.equal(7);
    expect(iter.next().done).to.equal(true);
  });

  it('should be able to find things once sorted', () => {
    const binaryTree = new BinaryTree<number>();
    binaryTree.add(3, 2, 4, 6, 1, 7, 5);
    const sortedTree = binaryTree.optimise((a, b) => (a - b));

    expect(sortedTree.contains(1)).to.be.true;
    expect(sortedTree.contains(2)).to.be.true;
    expect(sortedTree.contains(3)).to.be.true;
    expect(sortedTree.contains(4)).to.be.true;
    expect(sortedTree.contains(5)).to.be.true;
    expect(sortedTree.contains(6)).to.be.true;
    expect(sortedTree.contains(7)).to.be.true;
    expect(sortedTree.contains(8)).to.be.false;
  });

  it('should be remain sorted even if you add another number', () => {
    //     4
    //  2     6
    // 1 3   5 7

    const binaryTree = new BinaryTree<number>();
    const sortedTree = binaryTree.optimise((a, b) => (a - b));
    sortedTree.add(3, 2, 4, 6);
    sortedTree.add(1, 7, 5);

    const iter = sortedTree.breadthFirstIter();
    expect(iter.next().value).to.equal(4);
    expect(iter.next().value).to.equal(2);
    expect(iter.next().value).to.equal(6);
    expect(iter.next().value).to.equal(1);
    expect(iter.next().value).to.equal(3);
    expect(iter.next().value).to.equal(5);
    expect(iter.next().value).to.equal(7);
    expect(iter.next().done).to.equal(true);
  });
});
