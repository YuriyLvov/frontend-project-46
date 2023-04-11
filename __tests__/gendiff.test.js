import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'data', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  const jsonFile1Path1 = getFixturePath('file1.json');
  const jsonFile2Path2 = getFixturePath('file2.json');
  const yamlFile1Path1 = getFixturePath('file1.yaml');
  const yamlFile2Path2 = getFixturePath('file2.yaml');

  const jsonFileTree1Path1 = getFixturePath('filetree1.json');
  const jsonFileTree2Path2 = getFixturePath('filetree2.json');
  const yamlFileTree1Path1 = getFixturePath('filetree1.yaml');
  const yamlFileTree2Path2 = getFixturePath('filetree2.yaml');

  const filesStylishDiffExpectation = readFile('files-stylish-diff.txt');
  const filesTreeStylishDiffExpectation = readFile('files-stylish-tree-diff.txt');
  const filesPlainDiffExpectation = readFile('files-plain-diff.txt');
  const filesTreePlainDiffExpectation = readFile('files-tree-plain-diff.txt');
  const filesJsonDiffExpectation = readFile('files-json-diff.txt');
  const filesTreeJsonDiffExpectation = readFile('files-tree-json-diff.txt');

  describe('stylish', () => {
    it('should return appropriate value for json files', () => {
      const result = gendiff(jsonFile1Path1, jsonFile2Path2, 'stylish');

      expect(result).toEqual(filesStylishDiffExpectation);
    });

    it('should return appropriate value for yaml files', () => {
      const result = gendiff(yamlFile1Path1, yamlFile2Path2, 'stylish');

      expect(result).toEqual(filesStylishDiffExpectation);
    });

    it('should return appropriate value for json-tree files', () => {
      const result = gendiff(jsonFileTree1Path1, jsonFileTree2Path2, 'stylish');

      expect(result).toEqual(filesTreeStylishDiffExpectation);
    });

    it('should return appropriate value for yaml-tree files', () => {
      const result = gendiff(yamlFileTree1Path1, yamlFileTree2Path2, 'stylish');

      expect(result).toEqual(filesTreeStylishDiffExpectation);
    });
  });

  describe('plain', () => {
    it('should return appropriate value for json files', () => {
      const result = gendiff(jsonFile1Path1, jsonFile2Path2, 'plain');

      expect(result).toEqual(filesPlainDiffExpectation);
    });

    it('should return appropriate value for yaml files', () => {
      const result = gendiff(yamlFile1Path1, yamlFile2Path2, 'plain');

      expect(result).toEqual(filesPlainDiffExpectation);
    });

    it('should return appropriate value for json-tree files', () => {
      const result = gendiff(jsonFileTree1Path1, jsonFileTree2Path2, 'plain');

      expect(result).toEqual(filesTreePlainDiffExpectation);
    });

    it('should return appropriate value for yaml-tree files', () => {
      const result = gendiff(yamlFileTree1Path1, yamlFileTree2Path2, 'plain');

      expect(result).toEqual(filesTreePlainDiffExpectation);
    });
  });

  describe('json', () => {
    it('should return appropriate value for json files', () => {
      const result = gendiff(jsonFile1Path1, jsonFile2Path2, 'json');

      expect(result).toEqual(filesJsonDiffExpectation);
    });

    it('should return appropriate value for yaml files', () => {
      const result = gendiff(yamlFile1Path1, yamlFile2Path2, 'json');

      expect(result).toEqual(filesJsonDiffExpectation);
    });

    it('should return appropriate value for json-tree files', () => {
      const result = gendiff(jsonFileTree1Path1, jsonFileTree2Path2, 'json');

      expect(result).toEqual(filesTreeJsonDiffExpectation);
    });

    it('should return appropriate value for yaml-tree files', () => {
      const result = gendiff(yamlFileTree1Path1, yamlFileTree2Path2, 'json');

      expect(result).toEqual(filesTreeJsonDiffExpectation);
    });
  });
});
