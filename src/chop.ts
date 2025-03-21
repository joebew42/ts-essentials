const chopInternal = function (
  element: number,
  sortedArray: number[],
  startIndex: number,
  endIndex: number
) {
  if (startIndex > endIndex) {
    return -1;
  }

  if (startIndex === endIndex) {
    return sortedArray[startIndex] === element ? startIndex : -1;
  }

  const midIndex = startIndex + Math.floor(endIndex / 2);

  if (sortedArray[midIndex] === element) {
    return midIndex;
  }

  if (element > sortedArray[midIndex]) {
    return chopInternal(element, sortedArray, midIndex + 1, endIndex);
  }

  return chopInternal(element, sortedArray, 0, midIndex - 1);
};

const chop = function (element: number, sortedArray: number[]): number {
  return chopInternal(element, sortedArray, 0, sortedArray.length - 1);
};

export { chop };
