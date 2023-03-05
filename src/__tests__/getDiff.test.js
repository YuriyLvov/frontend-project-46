import getDiff from '../getDiff.js';

describe('getDiff', () => {
  describe('with changes', () => {
    describe('left changed', () => {
      it('should return diff if the field is exists only in one object and this is a primitive', () => {
        const first = { a: 'a', b: 'b', c: 'c' };
        const second = {};
        const result = getDiff(first, second);

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
        const result = getDiff(first, second);

        expect(result).toEqual([{
          fieldName: 'a',
          type: 'LEFT_CHANGED',
          value: [{
            fieldName: 'b',
            type: 'NO_CHAGES',
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
        const result = getDiff(first, second);

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
          }]);
      });

      it('should return diff if the field is exists only in one object and this is an object', () => {
        const first = {};
        const second = { a: { b: 'b' }, c: 'c' };
        const result = getDiff(first, second);

        expect(result).toEqual([{
          fieldName: 'a',
          type: 'RIGHT_CHANGED',
          value: [{
            fieldName: 'b',
            type: 'NO_CHAGES',
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
        const result = getDiff(first, second);

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
          type: 'NO_CHAGES',
          value: 'c1',
        }]);
      });

      it('should return diff if the field is a primitive and an object', () => {
        const first = { a: 'a1', c: { d: 'd1', e: 'e1' } };
        const second = { a: { b: 'b2' }, c: 'c2' };
        const result = getDiff(first, second);

        expect(result).toEqual([{
          fieldName: 'a',
          type: 'BOTH_CHANGED',
          valueLeft: 'a1',
          valueRight: [
            {
              fieldName: 'b',
              type: 'NO_CHAGES',
              value: 'b2',
            }
          ],
        }, {
          fieldName: 'c',
          type: 'BOTH_CHANGED',
          valueLeft: [
            {
              fieldName: 'd',
              type: 'NO_CHAGES',
              value: 'd1',
            },
            {
              fieldName: 'e',
              type: 'NO_CHAGES',
              value: 'e1',
            }
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
      const result = getDiff(first, second);

      expect(result).toEqual([{
        fieldName: 'a',
        type: 'NO_CHAGES',
        value: 'a',
      }, {
        fieldName: 'b',
        type: 'NO_CHAGES',
        value: 'b',
      }, {
        fieldName: 'c',
        type: 'NO_CHAGES',
        value: 'c',
      }]);
    });

    it('should return recusrive diff for two nested objects', () => {
      const first = { a: { b: 'b' }, c: { d: 'd', e: { f: 'f', g: 'g' } } };
      const second = { a: { b: 'b' }, c: { d: 'd', e: { f: 'f', g: 'g' } } };
      const result = getDiff(first, second);

      expect(result).toEqual([{
        fieldName: 'a',
        type: 'NO_CHAGES',
        value: [{
          fieldName: 'b',
          type: 'NO_CHAGES',
          value: 'b',
        }],
      }, {
        fieldName: 'c',
        type: 'NO_CHAGES',
        value: [{
          fieldName: 'd',
          type: 'NO_CHAGES',
          value: 'd',
        }, {
          fieldName: 'e',
          type: 'NO_CHAGES',
          value: [{
            fieldName: 'f',
            type: 'NO_CHAGES',
            value: 'f',
          }, {
            fieldName: 'g',
            type: 'NO_CHAGES',
            value: 'g',
          }],
        }],
      }]);
    });
  });

  // describe('sorting', () => {});
});
