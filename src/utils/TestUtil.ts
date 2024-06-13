export const printData = (start: number, end: number) => {
  let output = 'Array: [ ';
  for (let index = start; index < end; index++) {
    output += index + ' ';
  }
  console.log(output + ']');
};
