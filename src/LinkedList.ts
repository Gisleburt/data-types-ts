import {Maybe} from './Maybe';

export class ListNode<T> {
  constructor(public value: T, protected child?: ListNode<T>) {
  }

  append(child?: ListNode<T>) {
    this.child = child;
  }

  next(): ListNode<T>|undefined {
    return this.child;
  }
}

export class LinkedList<T> {
  private head?: ListNode<T>;
  constructor() {
  }

  protected setHead(newHead: ListNode<T>) {
    this.head = newHead;
  }

  prepend(value: T) {
    const newNode = new ListNode(value);
    if (this.head) {
      newNode.append(this.head);
    }
    this.head = newNode;
  }

  append(value: T) {
    let newNode = new ListNode<T>(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while(current.next()) {
      current = current.next()!;
    }
    current.append(newNode);
  }

  hasLoop(): boolean {
    if(!this.head) {
      return false;
    }
    let slow: Maybe<ListNode<T>> = this.head;
    let fast: Maybe<ListNode<T>> = this.head.next();
    while(slow && fast && fast.next()) {
      if(slow === fast) {
        return true;
      }
      slow = slow.next();
      fast = fast.next()!.next();
    }
    return false;
  }


  *iter(): IterableIterator<T> {
    if (this.head) {
      let current: ListNode<T>|undefined = this.head;
      while (current) {
        yield current.value;
        current = current.next();
      }
    }
  }

  public contains(value: T): boolean {
    for (const currentValue of this.iter()) {
      if (currentValue === value) {
        return true;
      }
    }
    return false;
  }

  public insertAfter(find: T, newValue: T) {
    let current = this.head;
    while(current) {
      if(current.value === find) {
        const newNode = new ListNode(newValue, current.next());
        current.append(newNode);
        return;
      }
      current = current.next();
    }
    throw new Error(`${find} not found in linked list`);
  }

  public insertBefore(find: T, newValue: T) {
    let current = this.head;
    if (current) {
      if(current.value === find) {
        this.prepend(newValue);
        return;
      }

      while(current.next()) {
        if(current.next()!.value === find) {
          const newNode = new ListNode(newValue, current.next());
          current.append(newNode);
          return;
        }
        current = current.next() as ListNode<T>; // We just checked this is set above, TS isn't smart enough to notice
      }
    }
    throw new Error(`${find} not found in linked list`);
  }

  public removeFirst(value: T) {
    let current = this.head;
    if(current) {
      if(current.value === value) {
        this.head = current.next();
        return;
      }

      while(current.next()) {
        if(current.next()!.value === value) {
          current.append(current.next()!.next());
          return;
        }
        current = current.next() as ListNode<T>;
      }
    }
  }

  public removeAll(value: T) {
    let current = this.head;
    if(current) {
      if(current.value === value) {
        this.head = current.next();
        return;
      }

      while(current.next()) {
        if(current.next()!.value === value) {
          current.append(current.next()!.next());
          continue;
        }
        current = current.next() as ListNode<T>;
      }
    }
  }

  public take(): Maybe<T> {
    const takenValue = this.head?.value;
    this.head = this.head?.next();
    return takenValue;
  }

  public peek(): Maybe<T> {
    return this.head?.value;
  }
}
