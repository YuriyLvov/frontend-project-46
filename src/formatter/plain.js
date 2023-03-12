import lodash from 'lodash';

const getFormattedValue = (value) => {
  if (lodash.isString(value)) {
    return `'${value}'`;
  } if (lodash.isObject(value)) {
    return '[complex value]';
  }

  return value;
};

const plain = (diff, path = '') => {
  let result = '';

  for (let i = 0; i < diff.length; i += 1) {
    const diffNode = diff[i];
    const pathToDiff = [path, diffNode.fieldName].filter((element) => Boolean(element)).join('.');

    if (diffNode.type === 'NO_CHAGES' && !lodash.isObject(diffNode.value)) {
      continue;
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
  }

  return result;
};

export default plain;
