import fs from 'fs';
import path from 'path';
import process from 'process';
import parsers from '../src/parsers.js';

describe('gendiff comp', () => {
  const cwd = process.cwd();

  it('should use correct parser for JSON', () => {
    const pathToFile = path.resolve(cwd, '__fixtures__/fixtures.json');
    const file = fs.readFileSync(pathToFile, { encoding: 'utf-8' });
    const extension = path.extname(pathToFile).substring(1);

    const result = parsers(file, extension);

    expect(result).toEqual({
      follow: false, host: 'hexlet.io', proxy: '123.234.53.22', timeout: 50,
    });
  });

  it('should use correct parser for YAML', () => {
    const pathToFile = path.resolve(cwd, '__fixtures__/fixtures.yaml');
    const file = fs.readFileSync(pathToFile, { encoding: 'utf-8' });
    const extension = path.extname(pathToFile).substring(1);

    const result = parsers(file, extension);

    expect(result).toEqual({
      follow: false, host: 'hexlet.io', proxy: '123.234.53.22', timeout: 50,
    });
  });

  it('should use correct parser for YML', () => {
    const pathToFile = path.resolve(cwd, '__fixtures__/fixtures.yml');
    const file = fs.readFileSync(pathToFile, { encoding: 'utf-8' });
    const extension = path.extname(pathToFile).substring(1);

    const result = parsers(file, extension);

    expect(result).toEqual({
      follow: false, host: 'hexlet.io', proxy: '123.234.53.22', timeout: 50,
    });
  });

  it('should return an empty object if extension unrecognized', () => {
    const pathToFile = path.resolve(cwd, '__fixtures__/fixtures.kokojumbo');
    const file = fs.readFileSync(pathToFile, { encoding: 'utf-8' });
    const extension = path.extname(pathToFile).substring(1);

    const result = parsers(file, extension);
    expect(result).toEqual({});
  });
});
