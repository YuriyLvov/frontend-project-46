import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (formatName) => {
  let formatter;

  if (formatName === 'stylish') {
    formatter = stylish;
  } else if (formatName === 'plain') {
    formatter = plain;
  } else if (formatName === 'json') {
    formatter = json;
  } else {
    formatter = stylish;
  }

  return formatter;
};

export default getFormatter;
