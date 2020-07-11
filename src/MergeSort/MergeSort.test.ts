import {expect} from 'chai';
import {mergeSort} from './MergeSort';

describe('mergeSort', () => {
  it('should sort an array of numbers', () => {
    const unsortedArray = [2, 9, 4, 7, 1, 6, 5, 3, 8];
    const sortedArray = mergeSort(unsortedArray);
    expect(sortedArray).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should sort an array of words', () => {
    const unsortedArray = ['apple', 'world', 'aardvark'];
    const sortedArray = mergeSort(unsortedArray);
    expect(sortedArray).to.deep.equal(['aardvark', 'apple', 'world']);
  });
});
