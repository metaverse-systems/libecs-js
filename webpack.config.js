const path = require('path');

const config = {
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        loader: "ts-loader"
      }
    ]
  }
};

const libConfig = Object.assign({}, config, {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'source-map'
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
