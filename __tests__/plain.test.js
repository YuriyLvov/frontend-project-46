import plain from '../src/formatter/plain.js';

describe('plain', () => {
  it('should show property was with a plain value', () => {
    const result = plain([
      {
        fieldName: 'a',
        type: 'NO_CHANGES',
        value: [
          { fieldName: 'b', type: 'RIGHT_CHANGED', value: false },
          { fieldName: 'c', type: 'RIGHT_CHANGED', value: 'a c' },
          {
            fieldName: 'd',
            type: 'NO_CHANGES',
            value: [
              { fieldName: 'e', type: 'RIGHT_CHANGED', value: 'a d e' },
            ],
          },
          { fieldName: 'f', type: 'RIGHT_CHANGED', value: null },
        ],
      },
    ]);

    expect(result).toEqual(`Property 'a.b' was added with value: false
Property 'a.c' was added with value: 'a c'
Property 'a.d.e' was added with value: 'a d e'
Property 'a.f' was added with value: null`);
  });

  it('should show property was with a complex value', () => {
    const result = plain([
      {
        fieldName: 'a',
        type: 'RIGHT_CHANGED',
        value: [
          { fieldName: 'b', type: 'NO_CHANGES', value: false },
          { fieldName: 'c', type: 'NO_CHANGES', value: 'a c' },
          {
            fieldName: 'd',
            type: 'NO_CHANGES',
            value: [
              { fieldName: 'e', type: 'NO_CHANGES', value: 'a d e' },
            ],
          },
          { fieldName: 'f', type: 'NO_CHANGES', value: null },
        ],
      },
      {
        fieldName: 'g',
        type: 'NO_CHANGES',
        value: [
          { fieldName: 'h', type: 'RIGHT_CHANGED', value: [] },
        ],
      },
    ]);

    expect(result).toEqual(`Property 'a' was added with value: [complex value]
Property 'g.h' was added with value: [complex value]`);
  });

  it('should show property was updated with plain values', () => {
    const result = plain([
      {
        fieldName: 'a',
        type: 'NO_CHANGES',
        value: [
          {
            fieldName: 'b', type: 'BOTH_CHANGED', valueLeft: true, valueRight: null,
          },
          {
            fieldName: 'c',
            type: 'NO_CHANGES',
            value: [
              {
                fieldName: 'd',
                type: 'NO_CHANGES',
                value: [
                  {
                    fieldName: 'e', type: 'BOTH_CHANGED', valueLeft: '', valueRight: 'e',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        fieldName: 'f', type: 'BOTH_CHANGED', valueLeft: false, valueRight: 'f',
      },
      {
        fieldName: 'g',
        type: 'NO_CHANGES',
        value: [
          {
            fieldName: 'h', type: 'BOTH_CHANGED', valueLeft: 'h', valueRight: 'hh',
          },
        ],
      },
    ]);

    expect(result).toEqual(`Property 'a.b' was updated. From true to null
Property 'a.c.d.e' was updated. From '' to 'e'
Property 'f' was updated. From false to 'f'
Property 'g.h' was updated. From 'h' to 'hh'`);
  });

  it('should show property was updated with plain and complex values', () => {
    const result = plain([
      {
        fieldName: 'a',
        type: 'NO_CHANGES',
        value: [
          {
            fieldName: 'b', type: 'BOTH_CHANGED', valueLeft: true, valueRight: null,
          },
          {
            fieldName: 'c',
            type: 'NO_CHANGES',
            value: [
              {
                fieldName: 'd',
                type: 'NO_CHANGES',
                value: [
                  {
                    fieldName: 'e',
                    type: 'BOTH_CHANGED',
                    valueLeft: '',
                    valueRight: [
                      { fieldName: 'ee', type: 'NO_CHANGES', value: '' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        fieldName: 'f',
        type: 'BOTH_CHANGED',
        valueLeft: false,
        valueRight: [
          { fieldName: 'ff', type: 'NO_CHANGES', value: null },
        ],
      },
      {
        fieldName: 'g',
        type: 'NO_CHANGES',
        value: [
          {
            fieldName: 'h',
            type: 'BOTH_CHANGED',
            valueLeft: 'h',
            valueRight: [
              { fieldName: 'hh', type: 'NO_CHANGES', value: 'hh' },
              { fieldName: 'hhh', type: 'NO_CHANGES', value: true },
            ],
          },
        ],
      },
      {
        fieldName: 'i',
        type: 'BOTH_CHANGED',
        valueLeft: [
          { fieldName: 'ii', type: 'NO_CHANGES', value: 'ii' },
        ],
        valueRight: 'i',
      }]);

    expect(result).toEqual(`Property 'a.b' was updated. From true to null
Property 'a.c.d.e' was updated. From '' to [complex value]
Property 'f' was updated. From false to [complex value]
Property 'g.h' was updated. From 'h' to [complex value]
Property 'i' was updated. From [complex value] to 'i'`);
  });

  it('should show property was removed', () => {
    const result = plain([
      {
        fieldName: 'a',
        type: 'NO_CHANGES',
        value: [
          { fieldName: 'b', type: 'LEFT_CHANGED', value: '' },
          {
            fieldName: 'c',
            type: 'NO_CHANGES',
            value: [
              { fieldName: 'd', type: 'LEFT_CHANGED', value: true },
            ],
          },
        ],
      },
      { fieldName: 'e', type: 'LEFT_CHANGED', value: 'e' },
    ]);

    expect(result).toEqual(`Property 'a.b' was removed
Property 'a.c.d' was removed
Property 'e' was removed`);
  });

  it('should ignore the same values', () => {
    const result = plain([
      { fieldName: 'a', type: 'NO_CHANGES', value: 'a' },
      {
        fieldName: 'b',
        type: 'NO_CHANGES',
        value: [
          { fieldName: 'c', type: 'NO_CHANGES', value: 'c' },
          {
            fieldName: 'd',
            type: 'NO_CHANGES',
            value: [
              { fieldName: 'e', type: 'NO_CHANGES', value: 'e' },
            ],
          },
        ],
      },
    ]);

    expect(result).toEqual('');
  });
});
