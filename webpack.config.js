const path = require('path');

const config = {
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        loader: "ts-loader",
        exclude: /(node_modules)/
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
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  devtool: 'source-map'
});

module.exports = [
  libConfig
];
