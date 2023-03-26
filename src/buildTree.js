import lodash from 'lodash';

const getDiff = (first, second) => {
  const allKeys = [...lodash.keys(first), ...lodash.keys(second)];
  const uniqueKeys = lodash.sortBy(lodash.uniq(allKeys));

  const result = uniqueKeys.map((key) => {
    const value1 = lodash.get(first, key);
    const value2 = lodash.get(second, key);

    const value1Exists = value1 !== undefined;
    const value2Exists = value2 !== undefined;

    const value1IsObject = lodash.isObject(value1);
    const value2IsObject = lodash.isObject(value2);

    if (first === null || second === null) {
      const caseValue = first === null ? value2 : value1;

      return {
        fieldName: key,
        type: 'NO_CHANGES',
        value: lodash.isObject(caseValue) ? getDiff(caseValue, null) : caseValue,
      };
    }

    if (!value1Exists || !value2Exists) {
      const caseValue = value1Exists ? value1 : value2;
      return {
        fieldName: key,
        type: value1Exists ? 'LEFT_CHANGED' : 'RIGHT_CHANGED',
        value: lodash.isObject(caseValue) ? getDiff(caseValue, null) : caseValue,
      };
    }

    if (!value1IsObject && !value2IsObject) {
      // 100% both are primitives
      return value1 === value2 ? {
        fieldName: key,
        type: 'NO_CHANGES',
        value: value1,
      } : {
        fieldName: key,
        type: 'BOTH_CHANGED',
        valueLeft: value1,
        valueRight: value2,
      };
    }

    if (value1IsObject && value2IsObject) {
      // 100% both are objects
      return {
        fieldName: key,
        type: 'NO_CHANGES',
        value: getDiff(value1, value2),
      };
    }

    return {
      fieldName: key,
      type: 'BOTH_CHANGED',
      valueLeft: value1IsObject ? getDiff(value1, null) : value1,
      valueRight: value2IsObject ? getDiff(value2, null) : value2,
    };
  });

  return result;
};

export default getDiff;