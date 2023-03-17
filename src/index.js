import parsers from './parsers.js';
import getDiff from './getDiff.js';
import getFormatter from './formatter/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parsers(filepath1);
  const file2 = parsers(filepath2);
  const formatter = getFormatter(formatName);
  const diff = getDiff(file1, file2);
  const result = formatter(diff);

  return result;
};

export default gendiff;
