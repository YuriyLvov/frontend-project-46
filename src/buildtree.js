import lodash from 'lodash';

const buildTree = (first, second) => {
  const allKeys = [...lodash.keys(first), ...lodash.keys(second)];
  const uniqueKeys = lodash.uniq(allKeys).sort();

  const result = [];

  for (let i = 0; i < uniqueKeys.length; i += 1) {
    const key = uniqueKeys[i];

    const value1 = lodash.get(first, key);
    const value2 = lodash.get(second, key);

    const value1Exists = value1 !== undefined;
    const value2Exists = value2 !== undefined;

    const value1IsObject = lodash.isObject(value1);
    const value2IsObject = lodash.isObject(value2);

    if (first === null || second === null) {
      const caseValue = first === null ? value2 : value1;

      result.push({
        fieldName: key,
        type: 'NO_CHAGES',
        value: lodash.isObject(caseValue) ? buildTree(caseValue, null) : caseValue,
      });
      continue;
    }

    if (!value1Exists || !value2Exists) {
      const caseValue = value1Exists ? value1 : value2;
      result.push({
        fieldName: key,
        type: value1Exists ? 'LEFT_CHANGED' : 'RIGHT_CHANGED',
        value: lodash.isObject(caseValue) ? buildTree(caseValue, null) : caseValue,
      });
      continue;
    }

    if (!value1IsObject && !value2IsObject) {
      // 100% both are primitives
      if (!value1Exists || !value2Exists) {
        result.push({
          fieldName: key,
          type: value1Exists ? 'LEFT_CHANGED' : 'RIGHT_CHANGED',
          value: value1Exists ? value1 : value2,
        });
        continue;
      } else if (value1 === value2) {
        result.push({
          fieldName: key,
          type: 'NO_CHAGES',
          value: value1,
        });
      } else {
        result.push({
          fieldName: key,
          type: 'BOTH_CHANGED',
          valueLeft: value1,
          valueRight: value2,
        });
      }
      continue;
    }

    if (value1IsObject && value2IsObject) {
      // 100% both are objects
      result.push({
        fieldName: key,
        type: 'NO_CHAGES',
        value: buildTree(value1, value2),
      });
      continue;
    }

    result.push({
      fieldName: key,
      type: 'BOTH_CHANGED',
      valueLeft: value1IsObject ? buildTree(value1, null) : value1,
      valueRight: value2IsObject ? buildTree(value2, null) : value2,
    });
  }

  return result;
};

export default buildTree;
