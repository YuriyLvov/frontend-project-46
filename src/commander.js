import { Command } from 'commander';
import parsers from './parsers.js';
import getDiff from './getDiff.js';
import stylish from './formatter/stylish.js';

const commander = () => {
  const cli = new Command();

  cli
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format', 'stylish')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .action((filepath1, filepath2) => {
      const format = cli.opts().format;
      const file1 = parsers(filepath1);
      const file2 = parsers(filepath2);

      let formatter;

      if (format === 'stylish') {
        formatter = stylish;
      } else {
        formatter = stylish;
      }

      const diff = getDiff(file1, file2);
      const result = formatter(diff);

      console.log(result);

      return result;
    })
    .version('0.0.1');

  cli.parse();
};

export default commander;
