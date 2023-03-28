import lodash from 'lodash';

const getValueRecursevly = (value1, value2) => {
  if (lodash.isPlainObject(value1) && lodash.isPlainObject(value2)) {
    // eslint-disable-next-line no-use-before-define
    return getDiff(value1, value2);
  }
  const caseValue = value1 || value2;

  // eslint-disable-next-line no-use-before-define
  return lodash.isPlainObject(caseValue) ? getDiff(caseValue, null) : caseValue;
};

const getDiff = (first, second) => {
  const allKeys = [...lodash.keys(first), ...lodash.keys(second)];
  const uniqueKeys = lodash.sortBy(lodash.uniq(allKeys));

  const result = uniqueKeys.map((key) => {
    const value1 = lodash.get(first, key);
    const value2 = lodash.get(second, key);

    const value1IsObject = lodash.isObject(value1);
    const value2IsObject = lodash.isObject(value2);

    if (
      (first === null || second === null)
      || value1 === value2
      || (value1IsObject && value2IsObject)
    ) {
      return {
        fieldName: key,
        type: 'NO_CHANGES',
        value: getValueRecursevly(value1, value2),
      };
    }

    if (!Object.hasOwn(first, key) || !Object.hasOwn(second, key)) {
      return {
        fieldName: key,
        type: Object.hasOwn(first, key) ? 'LEFT_CHANGED' : 'RIGHT_CHANGED',
        value: getValueRecursevly(value1, value2),
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
