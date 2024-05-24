export const printData = (start: number, end: number) => {
  let output = 'Array: [ ';
  for (let index = start; index < end; index++) {
    output += index + ' ';
  }
  console.log(output + ']');
};

export const printJSON = (data: string) => {
  console.log(JSON.stringify(data, null, 2));
};
