import lodash from 'lodash';

const spacesPaddingCount = 4;

const stylish = (diff, padding = 0) => {
  const spacesPadding = ' '.repeat(spacesPaddingCount * padding);
  let result = '';

  for (let i = 0; i < diff.length; i += 1) {
    const diffNode = diff[i];

    if (diffNode.type === 'LEFT_CHANGED') {
      const value = lodash.isObject(diffNode.value) ? stylish(diffNode.value, padding + 1) : diffNode.value;
      result += `${spacesPadding}  - ${diffNode.fieldName}: ${value}`;

    } else if (diffNode.type === 'RIGHT_CHANGED') {
      const value = lodash.isObject(diffNode.value) ? stylish(diffNode.value, padding + 1) : diffNode.value;
      result += `${spacesPadding}  + ${diffNode.fieldName}: ${value}`;

    } else if (diffNode.type === 'NO_CHAGES') {
      const value = lodash.isObject(diffNode.value) ? stylish(diffNode.value, padding + 1) : diffNode.value;
      result += `${spacesPadding}    ${diffNode.fieldName}: ${value}`;

    } else if (diffNode.type === 'BOTH_CHANGED') {
      const valueLeft = lodash.isObject(diffNode.valueLeft) ? stylish(diffNode.valueLeft, padding + 1) : diffNode.valueLeft;
      const valueRight = lodash.isObject(diffNode.valueRight) ? stylish(diffNode.valueRight, padding + 1) : diffNode.valueRight;
      result += `${spacesPadding}  - ${diffNode.fieldName}: ${valueLeft}\n`;
      result += `${spacesPadding}  + ${diffNode.fieldName}: ${valueRight}`;
    }

    if (i !== diff.length - 1) {
      result += '\n'
    }
  };
  return `{\n${result}\n${spacesPadding}}`;
};

export default stylish;
