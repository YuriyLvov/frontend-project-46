import fs from 'fs';
import path from 'path';
import process from 'process';
import parsers from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatter/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const cwd = process.cwd();

  const pathToFile1 = path.resolve(cwd, filepath1);
  const pathToFile2 = path.resolve(cwd, filepath2);

  const file1 = fs.readFileSync(pathToFile1, { encoding: 'utf-8' });
  const file2 = fs.readFileSync(pathToFile2, { encoding: 'utf-8' });

  const extension1 = path.extname(pathToFile1).substring(1);
  const extension2 = path.extname(pathToFile2).substring(1);

  const data1 = parsers(file1, extension1);
  const data2 = parsers(file2, extension2);

  const diff = buildTree(data1, data2);
  const result = format(diff, formatName);

  return result;
};

export default gendiff;
