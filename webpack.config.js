const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const postcssPxToViewport = require('postcss-px-to-viewport');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  // entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
    publicPath: '',
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  new postcssPxToViewport({
                    viewportWidth: 750,
                  }),
                  myPostcss(),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // plugins: [
  //   new UglifyJsPlugin({
  //     uglifyOptions: {
  //       compress: {
  //         drop_console: false,
  //       },
  //     },
  //   }),
  // ],
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack test',
      template: path.resolve(__dirname, './public/index.html'),
      inject: 'body',
      hash: true
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          // 其他压缩选项
          compress: {
            drop_console: false, //注释console
            pure_funcs: ['console.log'], //丢弃console.log
          },
          warnings: false, //显示警告
        },
      }),
    ],
  },
  // node: {
  //   __dirname: true,
  // },
  devServer: {
    compress: true,
  },
};

function myPostcss() {
  console.log(123);
}
