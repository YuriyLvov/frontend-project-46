import lodash from 'lodash';

const spacesPaddingCount = 4;

const stylish = (diff, padding = 0) => {
  console.log('diff', JSON.stringify(diff));
  console.log('padding', padding);
  const spacesPadding = ' '.repeat(padding * spacesPaddingCount);

  const result = diff.reduce((acc, diffNode, i, arr) => {
    const isLastNode = arr.length - 1 !== i;
    const endOfLine = isLastNode ? '' : '\n';

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
      return `${acc}${spacesPadding}  - ${fieldName}: ${valueFormatted}${endOfLine}`;
    }

    if (type === 'RIGHT_CHANGED') {
      const valueFormatted = lodash.isObject(value)
        ? stylish(value, padding + 1)
        : value;
      return `${acc}${spacesPadding}  + ${fieldName}: ${valueFormatted}${endOfLine}`;
    }

    if (type === 'NO_CHAGES') {
      const valueFormatted = lodash.isObject(value)
        ? stylish(value, padding + 1)
        : value;
      return `${acc}${spacesPadding}    ${fieldName}: ${valueFormatted}${endOfLine}`;
    }

    if (type === 'BOTH_CHANGED') {
      const valueLeftFormatted = lodash.isObject(valueLeft)
        ? stylish(valueLeft, padding + 1)
        : valueLeft;
      const valueRightFormatted = lodash.isObject(valueRight)
        ? stylish(valueRight, padding + 1)
        : valueRight;
      return `${acc}${spacesPadding}  - ${fieldName}: ${valueLeftFormatted}\n${spacesPadding}  + ${fieldName}: ${valueRightFormatted}${endOfLine}`;
    }

    return acc;
  }, '');

  return `{\n${result}${spacesPadding}}`;
};

export default stylish;
