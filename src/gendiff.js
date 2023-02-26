import fs from 'fs';
import path from  'path';
import process from  'process';
import { Command } from 'commander';
import lodash from 'lodash';

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

      const file1 = fs.readFileSync(file1path, {encoding: 'utf-8'});
      const file2 = fs.readFileSync(file2path, {encoding: 'utf-8'});

      const file1json = JSON.parse(file1);
      const file2json = JSON.parse(file2);

      const fileKeys = [...lodash.keys(file1json), ...lodash.keys(file2json)];
      const uniqueKeys = lodash.uniq(fileKeys).sort();

      let comparison = '';

      for (const key of uniqueKeys) {
        const value1 = file1json[key];
        const value2 = file2json[key];

        if (value1 !== undefined && value2 === undefined) {
          comparison += `- ${key}: ${value1}\n`;
          continue;
        } 
        
        if (value2 !== undefined && value1 === undefined) {
          comparison += `+ ${key}: ${value2}\n`;
          continue;
        }

        if (value1 === value2) {
          comparison += `  ${key}: ${value1}\n`;
          continue;
        }

        comparison += `- ${key}: ${value1}\n`;
        comparison += `+ ${key}: ${value2}\n`;
      }

      const result = `{\n${comparison}\n}`;

      console.log(result);

      return result;
    })
    .version('0.0.1');

  cli.parse();
};

export default genDiff;
