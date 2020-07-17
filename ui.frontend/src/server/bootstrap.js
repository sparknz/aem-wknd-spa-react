require('ignore-styles');

require('@babel/register')({
  ignore: [/(node_modules)/],
  plugins: [
    'babel-plugin-styled-components',
    'react-loadable/babel',
    [
      'file-loader',
      {
        name: '[name].[ext]',
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
        // TODO: properly fix these
        publicPath:
          '/etc.clientlibs/wknd-spa-react/clientlibs/clientlib-react/resources',
        outputPath: '/public',
        context: '',
        limit: 65536,
      },
    ],
  ],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

require('./index');
