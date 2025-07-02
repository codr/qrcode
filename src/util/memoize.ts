export const memoize = <T extends string | number>(fn: (arg: T) => number) => {
  const cache: any = {};
  return (arg: T) => (cache[arg] ??= fn(arg));
};
