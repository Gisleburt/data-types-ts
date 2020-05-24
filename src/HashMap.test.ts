import {HashMap} from './HashMap';
import { expect } from 'chai';

describe('HashMap', () => {
  it('should store and retrieve with normal keys', () => {
    const numberedHashMap = new HashMap();
    numberedHashMap.set(1, 'One');
    numberedHashMap.set(2, 'Two');
    numberedHashMap.set(3, 'Three');

    expect(numberedHashMap.get(1)).to.equal('One');
    expect(numberedHashMap.get(2)).to.equal('Two');
    expect(numberedHashMap.get(3)).to.equal('Three');

    const stringHashMap = new HashMap();
    stringHashMap.set('One', 1);
    stringHashMap.set('Two', 2);
    stringHashMap.set('Three', 3);

    expect(stringHashMap.get('One')).to.equal(1);
    expect(stringHashMap.get('Two')).to.equal(2);
    expect(stringHashMap.get('Three')).to.equal(3);
  });

  it('should store and retrieve with complex keys', () => {
    const hashMap = new HashMap();

    const elaborateUserAsTestKey = {
      name: 'Example Person',
      age: 30,
    };
    expect(hashMap.get(elaborateUserAsTestKey)).to.equal(undefined);

    const elaboratePetAsTestValue = {
      name: 'Fido',
      age: 10,
    };
    hashMap.set(elaborateUserAsTestKey, elaboratePetAsTestValue);

    expect(hashMap.get(elaborateUserAsTestKey)).to.equal(elaboratePetAsTestValue);
  });

  it('should override old values', () => {
    const numberedHashMap = new HashMap();
    numberedHashMap.set(1, 'One');
    numberedHashMap.set(1, 'Two');
    numberedHashMap.set(1, 'Three');

    expect(numberedHashMap.get(1)).to.equal('Three');
  });

  it('should handle collisions', () => {
    const badHashAlgorithm = (key: string) => key.length;
    const ineffecientHashMap = new HashMap(badHashAlgorithm);

    ineffecientHashMap.set('One', 1);
    ineffecientHashMap.set('Two', 2);
    ineffecientHashMap.set('Three', 3);

    expect(ineffecientHashMap.get('One')).to.equal(1);
    expect(ineffecientHashMap.get('Two')).to.equal(2);
    expect(ineffecientHashMap.get('Three')).to.equal(3);
  })
});
