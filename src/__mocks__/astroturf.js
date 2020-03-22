/**
 * converts incoming array of strings to an object
 * where the keys are css selectors
 * @param ary[]
 * @return Record<string,string>
 */
export const css = (ary) => {
  // get first string from the array
  const value =
    typeof ary === 'string' ? ary : Array.isArray(ary) ? ary[0] : '';
  const result = (value.match(/(\.[^\r\n,{};]+)[{:]/g) || []).map(
    (item) =>
      item
        .split(' {')[0] // remove { at the end
        .split(':')[0] // remove everything to the right of colon
        .split('.')[1] // remove dot at the beginning
  );
  const unique = Array.from(new Set(result));
  return unique.reduce((acc, next) => {
    acc[next] = next;
    return acc;
  }, {});
};
