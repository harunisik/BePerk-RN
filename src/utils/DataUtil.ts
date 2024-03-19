import {isDivisible} from './MathUtil';

export function appendData(data: [any], colNum = 3) {
  const length = data?.length;
  if (length && !isDivisible(length, colNum)) {
    const newData = [];
    for (let index = 0; !isDivisible(length + index, colNum); index++) {
      newData.push({id: length + index});
    }
    return [...data, ...newData];
  }
  return data;
}
