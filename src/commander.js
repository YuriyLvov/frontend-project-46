import { Command } from 'commander';
import genDiff from './genDiff.js';

const commander = () => {
  const cli = new Command();

  cli
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format', 'stylish')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .action((filepath1, filepath2) => {
      const { format } = cli.opts();
      const diff = genDiff(filepath1, filepath2, format);

      console.log(diff);

      return diff;
    })
    .version('0.0.1');

  cli.parse();
};

export default commander;
