import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

function getFormatter(formatName) {
  return formatters[formatName] || stylish;
}

export default getFormatter;
