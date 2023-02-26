import { Command } from 'commander';

const runGenDiff = () => {

  const cli = new Command();

  cli
    .name('gendiff')
    .description('Generate difference')
    .version('0.0.1');

  cli.parse();
};

export default runGenDiff;
