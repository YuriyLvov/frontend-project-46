import buildTree from '../src/buildTree.js';
import stylish from '../src/formatter/stylish.js';

describe('buildTree', () => {
  describe('with changes', () => {
    describe('left changed', () => {
      it('should return diff if the field is exists only in one object and this is a primitive', () => {
        const first = { a: 'a', b: 'b', c: 'c' };
        const second = {};
        const result = buildTree(first, second);

        expect(result).toEqual([{
          fieldName: 'a',
          type: 'LEFT_CHANGED',
          value: 'a',
        }, {
          fieldName: 'b',
          type: 'LEFT_CHANGED',
          value: 'b',
        }, {
          fieldName: 'c',
          type: 'LEFT_CHANGED',
          value: 'c',
        }]);
      });

      it('should return diff if the field is exists only in one object and this is an object', () => {
        const first = { a: { b: 'b' }, c: 'c' };
        const second = {};
        const result = buildTree(first, second);

        expect(result).toEqual([{
          fieldName: 'a',
          type: 'LEFT_CHANGED',
          value: [{
            fieldName: 'b',
            type: 'NO_CHANGES',
            value: 'b',
          }],
        }, {
          fieldName: 'c',
          type: 'LEFT_CHANGED',
          value: 'c',
        }]);
      });
    });

    describe('right changed', () => {
      it('should return diff if the field is exists only in one object and this is a primitive', () => {
        const first = {};
        const second = { a: 'a', b: 'b', c: 'c' };
        const result = buildTree(first, second);

        expect(result).toEqual(
          [{
            fieldName: 'a',
            type: 'RIGHT_CHANGED',
            value: 'a',
          }, {
            fieldName: 'b',
            type: 'RIGHT_CHANGED',
            value: 'b',
          }, {
            fieldName: 'c',
            type: 'RIGHT_CHANGED',
            value: 'c',
          }],
        );
      });

      it('should return diff if the field is exists only in one object and this is an object', () => {
        const first = {};
        const second = { a: { b: 'b' }, c: 'c' };
        const result = buildTree(first, second);

        expect(result).toEqual([{
          fieldName: 'a',
          type: 'RIGHT_CHANGED',
          value: [{
            fieldName: 'b',
            type: 'NO_CHANGES',
            value: 'b',
          }],
        }, {
          fieldName: 'c',
          type: 'RIGHT_CHANGED',
          value: 'c',
        }]);
      });
    });

    describe('both changed', () => {
      it('should return diff for two the different primitives', () => {
        const first = { a: 'a1', b: 'b1', c: 'c1' };
        const second = { a: 'a2', b: 'b2', c: 'c1' };
        const result = buildTree(first, second);

        expect(result).toEqual([{
          fieldName: 'a',
          type: 'BOTH_CHANGED',
          valueLeft: 'a1',
          valueRight: 'a2',
        }, {
          fieldName: 'b',
          type: 'BOTH_CHANGED',
          valueLeft: 'b1',
          valueRight: 'b2',
        }, {
          fieldName: 'c',
          type: 'NO_CHANGES',
          value: 'c1',
        }]);
      });

      it('should return diff if the field is a primitive and an object', () => {
        const first = { a: 'a1', c: { d: 'd1', e: 'e1' } };
        const second = { a: { b: 'b2' }, c: 'c2' };
        const result = buildTree(first, second);

        expect(result).toEqual([{
          fieldName: 'a',
          type: 'BOTH_CHANGED',
          valueLeft: 'a1',
          valueRight: [
            {
              fieldName: 'b',
              type: 'NO_CHANGES',
              value: 'b2',
            },
          ],
        }, {
          fieldName: 'c',
          type: 'BOTH_CHANGED',
          valueLeft: [
            {
              fieldName: 'd',
              type: 'NO_CHANGES',
              value: 'd1',
            },
            {
              fieldName: 'e',
              type: 'NO_CHANGES',
              value: 'e1',
            },
          ],
          valueRight: 'c2',
        }]);
      });
    });
  });

  describe('without changes', () => {
    it('should return diff for two the same primitives', () => {
      const first = { a: 'a', b: 'b', c: 'c' };
      const second = { a: 'a', b: 'b', c: 'c' };
      const result = buildTree(first, second);

      expect(result).toEqual([{
        fieldName: 'a',
        type: 'NO_CHANGES',
        value: 'a',
      }, {
        fieldName: 'b',
        type: 'NO_CHANGES',
        value: 'b',
      }, {
        fieldName: 'c',
        type: 'NO_CHANGES',
        value: 'c',
      }]);
    });

    it('should return recusrive diff for two nested objects', () => {
      const first = { a: { b: 'b' }, c: { d: 'd', e: { f: 'f', g: 'g' } } };
      const second = { a: { b: 'b' }, c: { d: 'd', e: { f: 'f', g: 'g' } } };
      const result = buildTree(first, second);

      expect(result).toEqual([{
        fieldName: 'a',
        type: 'NO_CHANGES',
        value: [{
          fieldName: 'b',
          type: 'NO_CHANGES',
          value: 'b',
        }],
      }, {
        fieldName: 'c',
        type: 'NO_CHANGES',
        value: [{
          fieldName: 'd',
          type: 'NO_CHANGES',
          value: 'd',
        }, {
          fieldName: 'e',
          type: 'NO_CHANGES',
          value: [{
            fieldName: 'f',
            type: 'NO_CHANGES',
            value: 'f',
          }, {
            fieldName: 'g',
            type: 'NO_CHANGES',
            value: 'g',
          }],
        }],
      }]);
    });
  });

    it('', () => {
      const file1 = { "common": { "setting1": "Value 1", "setting2": 200, "setting3": true, "setting6": { "key": "value", "doge": { "wow": "too much" } } }, "group1": { "baz": "bas", "foo": "bar", "nest": { "key": "value" } }, "group2": { "abc": 12345, "deep": { "id": 45 } }, "group4": { "default": null, "foo": 0, "isNested": false, "nest": { "bar": "", "isNested": true }, "type": "bas" }, "language": "js" };
      const file2 = { "common": { "follow": false, "setting1": "Value 1", "setting3": { "key": "value" }, "setting4": "blah blah", "setting5": { "key5": "value5" }, "setting6": { "key": "value", "ops": "vops", "doge": { "wow": "so much" } } }, "group1": { "foo": "bar", "baz": "bars", "nest": "str" }, "group3": { "deep": { "id": { "number": 45 } }, "fee": 100500 }, "group4": { "default": "", "foo": null, "isNested": "none", "key": false, "nest": { "bar": 0 }, "someKey": true, "type": "bar" }, "language": "js" };
      const diff = buildTree(file1, file2);
      const result = stylish(diff);

      expect(result).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
    group4: {
      - default: null
      + default: 
      - foo: 0
      + foo: null
      - isNested: false
      + isNested: none
      + key: false
        nest: {
          - bar: 
          + bar: 0
          - isNested: true
        }
      + someKey: true
      - type: bas
      + type: bar
    }
    language: js
}`);
    });
});
