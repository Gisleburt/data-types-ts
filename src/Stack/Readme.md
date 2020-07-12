Stack
=====

A stack is a data structure with an input and an output. The first piece of data that you put in will be the last piece
of data to come out (First In Last Out - FILO, as opposed to a [Queue](../Queue) which is FIFO - First in First Out).

The common way to picture this is if you have a stack of plates you are adding to. You can only add plates to the top of
the stack, but you can also only remove plates from the top, meaning the last plate added will be the first plate 
removed.

```typescript
const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

// Data comes out in reverse order
expect(stack.pop()).to.equal(3);
expect(stack.pop()).to.equal(2);
expect(stack.pop()).to.equal(1);
```

How does ours work?
-------------------

JavaScript arrays already provide the necessary methods, so we simply wrapped a class around one to provide a minimal
interface.
