const styleHook = require('css-modules-require-hook');

const generateScopedName = '[path][name]__[local]';

styleHook({
  extensions: ['.less', '.css'],
  processorOpts: { parser: require('postcss-less').parse },
  generateScopedName
});

module.exports = {
  process(src, filename) {
    const result = require(filename);
    return `module.exports = ${JSON.stringify(result)}`;
  },
};