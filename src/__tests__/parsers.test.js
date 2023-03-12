import parsers from '../parsers.js';

describe('gendiff comp', () => {
  it('should use correct parser for JSON', () => {
    const result = parsers('src/__tests__/__fixtures__/fixtures.json');
    expect(result).toEqual({
      follow: false, host: 'hexlet.io', proxy: '123.234.53.22', timeout: 50,
    });
  });

  it('should use correct parser for YAML', () => {
    const result = parsers('src/__tests__/__fixtures__/fixtures.yaml');
    expect(result).toEqual({
      follow: false, host: 'hexlet.io', proxy: '123.234.53.22', timeout: 50,
    });
  });

  it('should use correct parser for YML', () => {
    const result = parsers('src/__tests__/__fixtures__/fixtures.yml');
    expect(result).toEqual({
      follow: false, host: 'hexlet.io', proxy: '123.234.53.22', timeout: 50,
    });
  });

  it('should return an empty object if extension unrecognized', () => {
    const result = parsers('src/__tests__/__fixtures__/fixtures.kokojumbo');
    expect(result).toEqual({});
  });
});
