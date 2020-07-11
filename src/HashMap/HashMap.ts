import {Maybe} from '../Maybe';

class HashMapNode<K, V> {
  constructor(public key: K, public value: V) {}
}

interface HashMapCollection<K, V> {
  [hashedKey: string]: Array<HashMapNode<K, V>>,
}

export type HashFunction<K> = (key: K) => string|number;

export const defaultHash: HashFunction<any> = JSON.stringify;

export class HashMap<K, V> {
  protected hashMapCollection: HashMapCollection<K, V> = {};

  constructor(protected hashFunction: HashFunction<K> = defaultHash) {}

  protected getNode(key: K): Maybe<HashMapNode<K, V>> {
    const hashedKey = this.hashFunction(key);
    const collection = this.hashMapCollection[hashedKey]
    if(collection) {
      return collection.find((node) => node.key === key);
    }
  }

  get(key: K): Maybe<V> {
    return this.getNode(key)?.value;
  }

  set(key: K, value: V) {
    const hashedKey = this.hashFunction(key);

    if(this.hashMapCollection[hashedKey] === undefined) {
      this.hashMapCollection[hashedKey] = [];
    }

    const existingNode = this.getNode(key);
    if(existingNode) {
      existingNode.value = value;
    } else {
      const hashMapNode = new HashMapNode(key, value);
      this.hashMapCollection[hashedKey].push(hashMapNode);
    }
  }
}
