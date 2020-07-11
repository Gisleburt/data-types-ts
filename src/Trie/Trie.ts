import {HashMap} from '../HashMap/HashMap';
import {Maybe} from '../Maybe';

class TrieNode<T> {
  public children: HashMap<T, TrieNode<T>> = new HashMap<T, TrieNode<T>>();
  protected completesWord: boolean = false;

  protected addChild(value: T, completesWord: boolean): TrieNode<T> {
    const existingChild = this.children.get(value);
    if (existingChild) {
      existingChild.completesWord = existingChild.completesWord || completesWord;
      return existingChild;
    }

    const newChild = new TrieNode<T>();
    newChild.completesWord = completesWord;
    this.children.set(value, newChild);
    return newChild;
  }

  next(value: T): Maybe<TrieNode<T>> {
    return this.children.get(value);
  }

  isWord(): boolean {
    return this.completesWord;
  }
}

export class Trie<T> {
  private head: TrieNode<T> = new TrieNode<T>();

  add(values: Array<T>) {
    let current = this.head;
    while(values.length) {
      const value = values.shift();
      const completesWord = values.length === 0;
      current = (current as any).addChild(value, completesWord);
    }
  }

  start(): TrieNode<T> {
    return this.head;
  }
}
