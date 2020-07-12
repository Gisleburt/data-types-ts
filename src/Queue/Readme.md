Queue
=====

A queue is a data structure with an input and an output. The first piece of data that you put in will be the first piece
of data to come out (First In First Out - FIFO, as opposed to a [Stack](../Stack) which is FILO - First in Last Out).

The common way to picture this is if you have a queue of people. People join the back of the queue and are removed from
front of the line.

```typescript
const queue = new Queue();

queue.push(1);
queue.push(2);
queue.push(3);

// Data comes out in the order it went in
expect(queue.pop()).to.equal(1);
expect(queue.pop()).to.equal(2);
expect(queue.pop()).to.equal(3);
```

How does ours work?
-------------------

JavaScript arrays already provide the necessary methods, so we simply wrapped a class around one to provide a minimal
interface.
