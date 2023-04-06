import yaml from 'js-yaml';

const parsers = (data, extension) => {
  if (extension === 'json') {
    return JSON.parse(data);
  }
  if (extension === 'yaml' || extension === 'yml') {
    return yaml.load(data);
  }
  return {};
};

export default parsers;
