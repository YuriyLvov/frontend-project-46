import stylish from '../src/formatter/stylish.js';

describe('stylish', () => {
  it('should handle LEFT_CHANGED for plain objects', () => {
    const result = stylish([{
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

    expect(result).toEqual(`{
  - a: a
  - b: b
  - c: c
}`);
  });

  it('should handle RIGHT_CHANGED for plain objects', () => {
    const result = stylish([{
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

    expect(result).toEqual(`{
  + a: a
  + b: b
  + c: c
}`);
  });

  it('should handle NO_CHANGES for plain objects', () => {
    const result = stylish([{
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

    expect(result).toEqual(`{
    a: a
    b: b
    c: c
}`);
  });

  it('should handle BOTH_CHANGED for plain objects', () => {
    const result = stylish([{
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
      type: 'BOTH_CHANGED',
      valueLeft: 'c1',
      valueRight: 'c2',
    }]);

    expect(result).toEqual(`{
  - a: a1
  + a: a2
  - b: b1
  + b: b2
  - c: c1
  + c: c2
}`);
  });

  it('should handle LEFT_CHANGED for nested objects', () => {
    const result = stylish([{
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

    expect(result).toEqual(`{
  - a: {
        b: b
    }
  - c: c
}`);
  });

  it('should handle RIGHT_CHANGED for nested objects', () => {
    const result = stylish([{
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

    expect(result).toEqual(`{
  + a: {
        b: b
    }
  + c: c
}`);
  });

  it('should handle BOTH_CHANGED if the field is a primitive and an object', () => {
    const result = stylish([{
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

    expect(result).toEqual(`{
  - a: a1
  + a: {
        b: b2
    }
  - c: {
        d: d1
        e: e1
    }
  + c: c2
}`);
  });

  it('should handle NO_CHANGES for nested objects', () => {
    const result = stylish([{
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

    expect(result).toEqual(`{
    a: {
        b: b
    }
    c: {
        d: d
        e: {
            f: f
            g: g
        }
    }
}`);
  });
});
