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
      const line = stringify(`  - ${fieldName}: ${valueFormatted}\n`, ' ', padding);
      return `${acc}${line}`;
    }

    if (type === 'RIGHT_CHANGED') {
      const valueFormatted = lodash.isObject(value)
        ? stylish(value, padding + 1)
        : value;
      const line = stringify(`  + ${fieldName}: ${valueFormatted}\n`, ' ', padding);
      return `${acc}${line}`;
    }

    if (type === 'NO_CHANGES') {
      const valueFormatted = lodash.isObject(value)
        ? stylish(value, padding + 1)
        : value;
      const line = stringify(`    ${fieldName}: ${valueFormatted}\n`, ' ', padding);
      return `${acc}${line}`;
    }

    if (type === 'BOTH_CHANGED') {
      const valueLeftFormatted = lodash.isObject(valueLeft)
        ? stylish(valueLeft, padding + 1)
        : valueLeft;
      const valueRightFormatted = lodash.isObject(valueRight)
        ? stylish(valueRight, padding + 1)
        : valueRight;
      const lineMinus = stringify(`  - ${fieldName}: ${valueLeftFormatted}\n`, ' ', padding);
      const linePlus = stringify(`  + ${fieldName}: ${valueRightFormatted}\n`, ' ', padding);

      return `${acc}${lineMinus}${linePlus}`;
    }

    return acc;
  }, '');

  return `{\n${result}${spacesIndent}}`;
};

export default stylish;
