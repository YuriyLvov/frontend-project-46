import fs from 'fs';
import path from 'path';
import process from 'process';
import { Command } from 'commander';
import lodash from 'lodash';

export const compareJsons = (json1, json2) => {
  const fileKeys = [...lodash.keys(json1), ...lodash.keys(json2)];
  const uniqueKeys = lodash.uniq(fileKeys).sort();

  let comparison = '';

  for (let i = 0; i < uniqueKeys.length; i += 1) {
    const key = uniqueKeys[i];
    const value1 = json1[key];
    const value2 = json2[key];

    if (value1 !== undefined && value2 === undefined) {
      comparison += `- ${key}: ${value1}`;
    } else if (value2 !== undefined && value1 === undefined) {
      comparison += `+ ${key}: ${value2}`;
    } else if (value1 === value2) {
      comparison += `  ${key}: ${value1}`;
    } else {
      comparison += `- ${key}: ${value1}\n`;
      comparison += `+ ${key}: ${value2}`;
    }

    if (uniqueKeys.length - 1 !== i) {
      comparison += '\n';
    }
  }

  const result = `{\n${comparison}\n}`;

  return result;
};

const genDiff = () => {
  const cli = new Command();

  cli
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .action((filepath1, filepath2) => {
      const cwd = process.cwd();
      const file1path = path.resolve(cwd, filepath1);
      const file2path = path.resolve(cwd, filepath2);

      const file1 = fs.readFileSync(file1path, { encoding: 'utf-8' });
      const file2 = fs.readFileSync(file2path, { encoding: 'utf-8' });

      const file1json = JSON.parse(file1);
      const file2json = JSON.parse(file2);

      const result = compareJsons(file1json, file2json);

      console.log(result);

      return result;
    })
    .version('0.0.1');

  cli.parse();
};

export default genDiff;