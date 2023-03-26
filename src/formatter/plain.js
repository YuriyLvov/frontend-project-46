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
  return diff.reduce((acc, diffNode) => {
    const pathToDiff = [path, diffNode.fieldName].filter(Boolean).join('.');

    if (diffNode.type === 'NO_CHANGES' && typeof diffNode.value !== 'object') {
      return acc;
    }

    if (diffNode.type === 'LEFT_CHANGED') {
      return `${acc}Property '${pathToDiff}' was removed\n`;
    }

    if (diffNode.type === 'RIGHT_CHANGED') {
      return `${acc}Property '${pathToDiff}' was added with value: ${getFormattedValue(diffNode.value)}\n`;
    }

    if (diffNode.type === 'NO_CHANGES') {
      const value = plain(diffNode.value, pathToDiff);
      return `${acc}${value}\n`;
    }

    if (diffNode.type === 'BOTH_CHANGED') {
      return `${acc}Property '${pathToDiff}' was updated. From ${getFormattedValue(diffNode.valueLeft)} to ${getFormattedValue(diffNode.valueRight)}\n`;
    }
    return acc;
  }, '').trim();
}

export default plain;