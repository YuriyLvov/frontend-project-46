import lodash from 'lodash';

const spacesPaddingCount = 4;
const getIndent = (replacer, spacesCount = 0) => replacer.repeat(spacesCount * spacesPaddingCount);
const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const spacesIndent = getIndent(replacer, spacesCount);
  return `${spacesIndent}${value}`;
};

const stylish = (diff, padding = 0) => {
  const spacesIndent = getIndent(' ', padding);

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
      const abc = stringify(`  - ${fieldName}: ${valueFormatted}\n`, ' ', padding);
      return `${acc}${abc}`;
    }

    if (type === 'RIGHT_CHANGED') {
      const valueFormatted = lodash.isObject(value)
        ? stylish(value, padding + 1)
        : value;
      return `${acc}${spacesIndent}  + ${fieldName}: ${valueFormatted}\n`;
    }

    if (type === 'NO_CHANGES') {
      const valueFormatted = lodash.isObject(value)
        ? stylish(value, padding + 1)
        : value;
      return `${acc}${spacesIndent}    ${fieldName}: ${valueFormatted}\n`;
    }

    if (type === 'BOTH_CHANGED') {
      const valueLeftFormatted = lodash.isObject(valueLeft)
        ? stylish(valueLeft, padding + 1)
        : valueLeft;
      const valueRightFormatted = lodash.isObject(valueRight)
        ? stylish(valueRight, padding + 1)
        : valueRight;
      return `${acc}${spacesIndent}  - ${fieldName}: ${valueLeftFormatted}\n${spacesIndent}  + ${fieldName}: ${valueRightFormatted}\n`;
    }

    return acc;
  }, '');

  return `{\n${result}${spacesIndent}}`;
};

export default stylish;
