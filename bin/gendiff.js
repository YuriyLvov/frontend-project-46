#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const cli = new Command();

cli
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filepath1, filepath2) => {
    const { format } = cli.opts();
    const diff = gendiff(filepath1, filepath2, format);

    return diff;
  })
  .version('0.0.1');

cli.parse();
