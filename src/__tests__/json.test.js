import json from '../formatter/json.js';

describe('json', () => {
  it('should return file as a string', () => {
    const result = json([
      {
        "fieldName": "a", "type": "NO_CHAGES", "value": [
          { "fieldName": "b", "type": "RIGHT_CHANGED", "value": false },
          { "fieldName": "c", "type": "RIGHT_CHANGED", "value": "a c" },
          {
            "fieldName": "d", "type": "NO_CHAGES", "value": [
              { "fieldName": "e", "type": "RIGHT_CHANGED", "value": "a d e" }
            ]
          },
          { "fieldName": "f", "type": "RIGHT_CHANGED", "value": null }
        ]
      }, {
        "fieldName": "a", "type": "RIGHT_CHANGED", "value": [
          { "fieldName": "b", "type": "NO_CHAGES", "value": false },
          { "fieldName": "c", "type": "NO_CHAGES", "value": "a c" },
          {
            "fieldName": "d", "type": "NO_CHAGES", "value": [
              { "fieldName": "e", "type": "NO_CHAGES", "value": "a d e" }
            ]
          },
          { "fieldName": "f", "type": "NO_CHAGES", "value": null }
        ]
      },
      {
        "fieldName": "g", "type": "NO_CHAGES", "value": [
          { "fieldName": "h", "type": "RIGHT_CHANGED", "value": [] }
        ]
      }
    ]);

    expect(result).toEqual("[{\"fieldName\":\"a\",\"type\":\"NO_CHAGES\",\"value\":[{\"fieldName\":\"b\",\"type\":\"RIGHT_CHANGED\",\"value\":false},{\"fieldName\":\"c\",\"type\":\"RIGHT_CHANGED\",\"value\":\"a c\"},{\"fieldName\":\"d\",\"type\":\"NO_CHAGES\",\"value\":[{\"fieldName\":\"e\",\"type\":\"RIGHT_CHANGED\",\"value\":\"a d e\"}]},{\"fieldName\":\"f\",\"type\":\"RIGHT_CHANGED\",\"value\":null}]},{\"fieldName\":\"a\",\"type\":\"RIGHT_CHANGED\",\"value\":[{\"fieldName\":\"b\",\"type\":\"NO_CHAGES\",\"value\":false},{\"fieldName\":\"c\",\"type\":\"NO_CHAGES\",\"value\":\"a c\"},{\"fieldName\":\"d\",\"type\":\"NO_CHAGES\",\"value\":[{\"fieldName\":\"e\",\"type\":\"NO_CHAGES\",\"value\":\"a d e\"}]},{\"fieldName\":\"f\",\"type\":\"NO_CHAGES\",\"value\":null}]},{\"fieldName\":\"g\",\"type\":\"NO_CHAGES\",\"value\":[{\"fieldName\":\"h\",\"type\":\"RIGHT_CHANGED\",\"value\":[]}]}]");
  });
});
