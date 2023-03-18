import parsers from './parsers.js';
import buildTree from './buildTree.js';
import getFormatter from './formatter/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parsers(filepath1);
  const file2 = parsers(filepath2);
  const formatter = getFormatter(formatName);
  const diff = buildTree(file1, file2);
  const result = formatter(diff);
  // console.log('formatter', formatter);
  console.log('diff', JSON.stringify(diff));
  // console.log('result', result);
  return result;
};

export default gendiff;
