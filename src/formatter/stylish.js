import lodash from 'lodash';

const spacesPaddingCount = 4;

const stylish = (diff, padding = 0) => {
  const spacesPadding = ' '.repeat(padding * spacesPaddingCount);

  const result = diff.reduce((acc, diffNode) => {
    const {
      fieldName,
      type,
      value,
      valueLeft,
      valueRight,
    } = diffNode;

    if (type === 'LEFT_CHANGED') {
      const valueFormatted = lodash.isObject(value)
        ? stylish(value, padding + 1)
        : value;
      return `${acc}${spacesPadding}  - ${fieldName}: ${valueFormatted}\n`;
    }

    if (type === 'RIGHT_CHANGED') {
      const valueFormatted = lodash.isObject(value)
        ? stylish(value, padding + 1)
        : value;
      return `${acc}${spacesPadding}  + ${fieldName}: ${valueFormatted}\n`;
    }

    if (type === 'NO_CHANGES') {
      const valueFormatted = lodash.isObject(value)
        ? stylish(value, padding + 1)
        : value;
      return `${acc}${spacesPadding}    ${fieldName}: ${valueFormatted}\n`;
    }

    if (type === 'BOTH_CHANGED') {
      const valueLeftFormatted = lodash.isObject(valueLeft)
        ? stylish(valueLeft, padding + 1)
        : valueLeft;
      const valueRightFormatted = lodash.isObject(valueRight)
        ? stylish(valueRight, padding + 1)
        : valueRight;
      return `${acc}${spacesPadding}  - ${fieldName}: ${valueLeftFormatted}\n${spacesPadding}  + ${fieldName}: ${valueRightFormatted}\n`;
    }

    return acc;
  }, '');

  return `{\n${result}${spacesPadding}}`;
};

export default stylish;
