const path = require('path');

const config = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      }
    ]
  }
};

const libConfig = Object.assign({}, config, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  }
});

const exampleConfig = Object.assign({}, config, {
  mode: 'production',
  entry: './example/example.js',
  output: {
    path: path.resolve('example'),
    filename: 'test.js',
    libraryTarget: 'commonjs2',
  }
});

module.exports = [
  libConfig,
  exampleConfig
];
/*
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      }
    ],
  }
};
*/
