import { expect } from "chai";
import {Trie} from './Trie';

describe('Trie', () => {
  it('should spell check words as you type', () => {
    const trie = new Trie();
    trie.add('tree'.split(''));
    trie.add('trie'.split(''));
    trie.add('tries'.split(''));
    trie.add('trees'.split(''));

    const word = trie.start();
    expect(word.next('t')?.next('r')?.next('e')?.next('e')?.next('s')?.isWord()).to.equal(true)
    expect(word.next('t')?.next('r')?.next('i')?.next('e')?.next('s')?.isWord()).to.equal(true)
    expect(word.next('t')?.next('r')?.next('e')?.next('e')?.isWord()).to.equal(true)
    expect(word.next('t')?.next('r')?.next('i')?.next('e')?.isWord()).to.equal(true)
  });
});
