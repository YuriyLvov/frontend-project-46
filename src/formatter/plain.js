import lodash from 'lodash';

const getFormattedValue = (value) => {
  if (lodash.isString(value)) {
    return `'${value}'`;
  } if (lodash.isObject(value)) {
    return '[complex value]';
  }

  return value;
};

function plain(diff, path = '') {
  return diff.reduce((acc, {
    fieldName, type, value, valueLeft, valueRight,
  }) => {
    const pathToDiff = [path, fieldName].filter(Boolean).join('.');

    if (type === 'NO_CHANGES' && typeof value !== 'object') {
      return acc;
    }

    if (type === 'LEFT_CHANGED') {
      return `${acc}Property '${pathToDiff}' was removed\n`;
    }

    if (type === 'RIGHT_CHANGED') {
      return `${acc}Property '${pathToDiff}' was added with value: ${getFormattedValue(value)}\n`;
    }

    if (type === 'NO_CHANGES') {
      const valuePlain = plain(value, pathToDiff);
      return `${acc}${valuePlain}\n`;
    }

    if (type === 'BOTH_CHANGED') {
      return `${acc}Property '${pathToDiff}' was updated. From ${getFormattedValue(valueLeft)} to ${getFormattedValue(valueRight)}\n`;
    }
    return acc;
  }, '').trim();
}

export default plain;
