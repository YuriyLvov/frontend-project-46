import yaml from 'js-yaml';

const parsers = (data, extension) => {
  if (extension === '.json') {
    return JSON.parse(data);
  } if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(data);
  }

  return {};
};

export default parsers;
