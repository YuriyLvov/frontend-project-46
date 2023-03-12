import parsers from './parsers.js';
import getDiff from './getDiff.js';
import stylish from './formatter/stylish.js';
import plain from './formatter/plain.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const file1 = parsers(filepath1);
  const file2 = parsers(filepath2);

  let formatter;

  if (formatName === 'stylish') {
    formatter = stylish;
  } else if (formatName === 'plain') {
    formatter = plain;
  } else {
    formatter = plain;
  }

  const diff = getDiff(file1, file2);
  const result = formatter(diff);

  return result;
};

export default genDiff;
