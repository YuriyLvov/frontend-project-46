import lodash from 'lodash';

const spacesPaddingCount = 4;
const getIndent = (replacer, spacesCount = 0) => replacer.repeat(spacesCount * spacesPaddingCount);
const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const spacesIndent = getIndent(replacer, spacesCount);
  return `${spacesIndent}${value}`;
};

const stylish = (diff, padding = 0) => {
  const spacesIndent = getIndent(' ', padding);

  const getLine = (fieldName, value, prefix) => {
    const valueFormatted = lodash.isObject(value)
      ? stylish(value, padding + 1)
      : value;
    const line = stringify(`  ${prefix} ${fieldName}: ${valueFormatted}\n`, ' ', padding);

    return line;
  };

  const result = diff.reduce((acc, diffNode) => {
    const {
      fieldName,
      type,
      value,
      valueLeft,
      valueRight,
    } = diffNode;

    if (type === 'LEFT_CHANGED') {
      const line = getLine(fieldName, value, '-');
      return `${acc}${line}`;
    }

    if (type === 'RIGHT_CHANGED') {
      const line = getLine(fieldName, value, '+');
      return `${acc}${line}`;
    }

    if (type === 'NO_CHANGES') {
      const line = getLine(fieldName, value, ' ');
      return `${acc}${line}`;
    }

    if (type === 'BOTH_CHANGED') {
      const lineMinus = getLine(fieldName, valueLeft, '-');
      const linePlus = getLine(fieldName, valueRight, '+');

      return `${acc}${lineMinus}${linePlus}`;
    }

    return acc;
  }, '');

  return `{\n${result}${spacesIndent}}`;
};

export default stylish;
