import parsers from './parsers.js';
import buildTree from './buildTree.js';
import getFormatter from './formatter/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parsers(filepath1);
  const file2 = parsers(filepath2);
  const formatter = getFormatter(formatName);
  console.log('file1', file1);
  console.log('file2', file2);
  const diff = buildTree(file1, file2);
  const result = formatter(diff);

  return result;
};

export default gendiff;
