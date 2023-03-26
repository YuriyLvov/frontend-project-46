import lodash from 'lodash';

const getValueRecursevly = (value1, value2) => {
  const caseValue = value1 || value2;

  // eslint-disable-next-line no-use-before-define
  return lodash.isPlainObject(caseValue) ? getDiff(caseValue, null) : caseValue;
};

function getDiff(first, second) {
  const allKeys = [...lodash.keys(first), ...lodash.keys(second)];
  const uniqueKeys = lodash.sortBy(lodash.uniq(allKeys));

  const result = uniqueKeys.map((key) => {
    const value1 = lodash.get(first, key);
    const value2 = lodash.get(second, key);

    const value1IsObject = lodash.isPlainObject(value1);
    const value2IsObject = lodash.isPlainObject(value2);

    const isRecursiveCall = first === null || second === null;

    if ((value1IsObject && value2IsObject) || isRecursiveCall || value1 === value2) {
      return {
        fieldName: key,
        type: 'NO_CHANGES',
        value: getValueRecursevly(value1, value2),
      };
    }

    if (!Object.hasOwn(second, key)) {
      return {
        fieldName: key,
        type: 'LEFT_CHANGED',
        value: getValueRecursevly(value1, null),
      };
    }

    if (!Object.hasOwn(first, key)) {
      return {
        fieldName: key,
        type: 'RIGHT_CHANGED',
        value: getValueRecursevly(value2, null),
      };
    }

    return {
      fieldName: key,
      type: 'BOTH_CHANGED',
      valueLeft: getValueRecursevly(value1, null),
      valueRight: getValueRecursevly(value2, null),
    };
  });

  return result;
};

export default getDiff;
