HashMap
=======

A hash map is a way of storing a value `V` against a key `K`.

```typescript
const hashMap = new HashMap();

hashMap.set('firstName', 'Daniel');
hashMap.set('lastName', 'Mason');
```

You can then recall that data again by providing the same key

```typescript
expect(hashMap.get('firstName')).to.equal('Daniel')
```

How does it work?
-----------------

A hashmap uses a hashing function to turn the key into an index in an array (in our code example we actually use the 
key as an entry into a javascript object which is itself a hashmap, so a little redundant).

It is possible for a key to hash to the same value. Let's imagine we have a really simple hashing function that simple
uses the key's length:

```typescript
const hashFunction = (key: string) => key.length
```

In our example above, if we are ok with the keys `'firstName'` and `'lastName'` as they are different lengths, but if
we added `postCode`, both postCode and lastName have the same length and would generate the same index.

In order to cope with this, in the actual storage array we place a linked list where each Node contains both the key and
the value. When we want to `get` or `set` a value we walk through the linked list to see if the key already exists.

You might think that a hash function that uses string length is dumb but early versions of PHP used this technique and
only stopped once it was discovered it could be exploited through user input.

Worse still would be a very expensive hash algorithm, for example, one that json encoded the key and used that as the 
index (which is what we did here).
