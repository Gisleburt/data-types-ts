Binary Tree
===========

A binary tree is a tree data structure where each node can have at most only two child nodes

```text
     A    <- root node
   /   \
  B     C <- node B has two children, node C has only one child
 / \   /
D   E F   <- these nodes have no children
```

You can walk a binary tree in two ways, depth first or breadth first.

Depth first
-----------

1. Read the current node, then go left and repeat.
2. If there are no left nodes go right and repeat.

This would use a [stack](../Stack) so the next node is always the last one added

```typescript
const stack = new Stack();
stack.push(rootNode);

while (!stack.isEmpty()) {
  const node = stack.pop()
  read(node);
  if (node.right) {
    stack.push(node.right);
  }
  if (node.left) {
    stack.push(node.left);
  }
}
```

However, we can also utilise the call stack for a slightly easier to grok method:

```typescript
const depthFirst = (node: Node) => {
  read(node);
  if (node.left) {
    depthFirst(node.left);
  }
  if (node.right) {
    depthFirst(node.right);
  }
}

depthFirst(rootNode);
```

Eg, the following:

```text
     A
   /   \
  B     C
 / \   /
D   E F
```
Produces:
```text
ABDECF
```

Breadth first
-------------

Add each child to a queue, get the next item off the queue read it and repeat.

```typescript
const queue = new Queue();
queue.enqueue(rootNode);

while(!queue.isEmpty()) {
  const node = queue.dequeue();
  read(node)

  if (node.left) {
    queue.enqueue(node.left)
  }
  if (node.right) {
    queue.enqueue(node.right)
  }
}
```

Eg:
```text
     A
   /   \
  B     C
 / \   /
D   E F
```
produces:
```text
ABCDEF
```

How does ours work?
-------------------

There are two ways you can implement this, the most obvious is to have a Node object: 

```typescript
interface Node<T> {
  data: T;
  left: Maybe<Node<T>>;
  right: Maybe<Node<T>>;
}
```

The benefits of this are that your binary tree does not need to be balanced, eg:

```typescript
      A
     / \
    B   E
   /
  C
 /
D
```

The downside is if you're not careful you might link nodes incorrectly

However, there is another way to do it with a simple array.

Remember our original tree:

 ```text
     A
   /   \
  B     C
 / \   /
D   E F
```

We can store this data in a linear array

```text
0: A, 1: B, 2: C, 3: D, 4: E, 5: F
```

We can find the child of a node so long as we know that nodes index.

The left child has an index of `(i * 2) + 1`, the right child has an index of `(i * 2) + 2`.

Take C for example, its index is 2, so its left node is at `(2 * 2) + 1`, which is 5, where we find F.
