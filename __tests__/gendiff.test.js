import fs from 'fs';
import gendiff from '../src/index.js';

describe('gendiff', () => {
  const jsonFile1Path1 = '__fixtures__/data/file1.json';
  const jsonFile2Path2 = '__fixtures__/data/file2.json';
  const yamlFile1Path1 = '__fixtures__/data/file1.yaml';
  const yamlFile2Path2 = '__fixtures__/data/file2.yaml';

  const jsonFileTree1Path1 = '__fixtures__/data/filetree1.json';
  const jsonFileTree2Path2 = '__fixtures__/data/filetree2.json';
  const yamlFileTree1Path1 = '__fixtures__/data/filetree1.yaml';
  const yamlFileTree2Path2 = '__fixtures__/data/filetree2.yaml';

  const filesStylishDiffExpectation = fs.readFileSync('__fixtures__/data/files-stylish-diff.txt', { encoding: 'utf-8' });
  const filesTreeStylishDiffExpectation = fs.readFileSync('__fixtures__/data/files-stylish-tree-diff.txt', { encoding: 'utf-8' });
  const filesPlainDiffExpectation = fs.readFileSync('__fixtures__/data/files-plain-diff.txt', { encoding: 'utf-8' });
  const filesTreePlainDiffExpectation = fs.readFileSync('__fixtures__/data/files-tree-plain-diff.txt', { encoding: 'utf-8' });
  const filesJsonDiffExpectation = fs.readFileSync('__fixtures__/data/files-json-diff.txt', { encoding: 'utf-8' });
  const filesTreeJsonDiffExpectation = fs.readFileSync('__fixtures__/data/files-tree-json-diff.txt', { encoding: 'utf-8' });

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
