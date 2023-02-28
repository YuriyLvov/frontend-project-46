import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

const parsers = (filepath) => {
  const cwd = process.cwd();
  const pathToFile = path.resolve(cwd, filepath);

  const file = fs.readFileSync(pathToFile, { encoding: 'utf-8' });

  const extension = path.extname(pathToFile);

  if (extension === '.json') {
    return JSON.parse(file);
  } else if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(file);
  }

  return {};
};

export default parsers;
