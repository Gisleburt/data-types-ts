export const mergeSort: <T>(arr: Array<T>) => Array<T> = (arr) => {
  let left = arr.slice(0, Math.ceil(arr.length / 2));
  let right = arr.slice(Math.ceil(arr.length / 2));
  if(left.length > 1) {
    left = mergeSort(left);
  }
  if(right.length > 1) {
    right = mergeSort(right);
  }

  return merge(left, right);
}

const merge: <T>(a1: Array<T>, a2: Array<T>) => Array<T> = (a1, a2) => {
  let a1Pointer = 0;
  let a2Pointer = 0;
  let merged = new Array(a1.length + a2.length);
  while(a1Pointer < a1.length || a2Pointer < a2.length) {
    // Do we take from a1?
    if (a2Pointer >= a2.length || (a1Pointer < a1.length && a1[a1Pointer] < a2[a2Pointer])) {
      merged[a1Pointer + a2Pointer] = a1[a1Pointer];
      a1Pointer = a1Pointer + 1;
    }
    else {
      merged[a1Pointer + a2Pointer] = a2[a2Pointer];
      a2Pointer = a2Pointer + 1;
    }
  }
  return merged;
}
