export function toBoolean(value: number) {
  return value === 0 ? false : true;
}

export function toNumber(value: boolean) {
  return value === true ? 1 : 0;
}
