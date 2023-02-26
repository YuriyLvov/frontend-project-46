import { compareJsons } from '../gendiff.js';

describe('gendiff comp', () => {
  it('should use the "-" prefix if the value exists only in first object', () => {
    expect(compareJsons({ a: 1 }, {})).toEqual('{\n- a: 1\n}');
  });

  it('should use the "+" prefix if the value exists only in second object', () => {
    expect(compareJsons({}, { b: 2 })).toEqual('{\n+ b: 2\n}');
  });

  it('should not use any prefix if value the same in both objects', () => {
    expect(compareJsons({ c: 3 }, { c: 3 })).toEqual('{\n  c: 3\n}');
  });

  it('should use both prefixes if values are different in both objects', () => {
    expect(compareJsons({ d: 4 }, { d: 5 })).toEqual('{\n- d: 4\n+ d: 5\n}');
  });

  it('should sort result by keys in alphabet', () => {
    const result = compareJsons({ c: 1, a: 2, d: 3 }, { b: 1, c: 2, d: 3, a: 4 });
    expect(result).toEqual('{\n- a: 2\n+ a: 4\n+ b: 1\n- c: 1\n+ c: 2\n  d: 3\n}');
  });
});
