import {isDivisible} from './MathUtil';

export function appendData(data: any[] | undefined, key = 'id', colNum = 3) {
  const length = data?.length;
  if (length && !isDivisible(length, colNum)) {
    const newData = [];
    for (let index = 0; !isDivisible(length + index, colNum); index++) {
      newData.push({[key]: length + index});
    }
    return [...data, ...newData];
  }
  return data;
}
