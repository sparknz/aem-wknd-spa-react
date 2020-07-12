require('ignore-styles');

require('@babel/register')({
  ignore: [/(node_modules)/],
  plugins: ['babel-plugin-styled-components'],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

require('./index');
