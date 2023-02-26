import { Command } from 'commander';

const runGenDiff = () => {

  const cli = new Command();

  cli
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .version('0.0.1');

  cli.parse();
};

export default runGenDiff;
