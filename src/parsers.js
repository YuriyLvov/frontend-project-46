import yaml from 'js-yaml';

const parsers = (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  } if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(file);
  }

  return {};
};

export default parsers;
