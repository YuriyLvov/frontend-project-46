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
  let result = '';

  diff.forEach((diffNode, i) => {
    const pathToDiff = [path, diffNode.fieldName].filter(Boolean).join('.');

    if (diffNode.type === 'NO_CHAGES' && typeof diffNode.value !== 'object') {
      return;
    }

    if (diffNode.type === 'LEFT_CHANGED') {
      result += `Property '${pathToDiff}' was removed`;
    } else if (diffNode.type === 'RIGHT_CHANGED') {
      result += `Property '${pathToDiff}' was added with value: ${getFormattedValue(diffNode.value)}`;
    } else if (diffNode.type === 'NO_CHAGES') {
      const value = plain(diffNode.value, pathToDiff);
      result += value;
    } else if (diffNode.type === 'BOTH_CHANGED') {
      result += `Property '${pathToDiff}' was updated. From ${getFormattedValue(diffNode.valueLeft)} to ${getFormattedValue(diffNode.valueRight)}`;
    }

    if (i !== diff.length - 1) {
      result += '\n';
    }
  });
  // Replaced let with const to avoid accidental reassignment of the result variable.
  return result.trim();
}

export default plain;
