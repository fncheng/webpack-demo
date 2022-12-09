const path = require('path');
module.exports = {
  mode: 'production', // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.

  entry: './app/entry', // string | object | array  // 这里应用程序开始执行 默认值 ./src/index.js
  // webpack 开始打包

  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, 'dist'), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    filename: 'bundle.js', // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    // 打包的资源文件存放位置,dist 目录下
    publicPath: '/assets/', // string    // 输出解析文件的目录，url 相对于 HTML 页面

    library: 'MyLibrary', // string,
    // 导出库(exported library)的名称

    libraryTarget: 'umd', // 通用模块定义    // 导出库(exported library)的类型

    /* 高级输出配置（点击显示） */
  },

  module: {
    // 关于模块配置
    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'app')],
        exclude: [path.resolve(__dirname, 'app/demo-files')],
        // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
        // test 和 include 具有相同的作用，都是必须匹配选项
        // exclude 是必不匹配选项（优先于 test 和 include）
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include

        issuer: { test, include, exclude },
        // issuer 条件（导入源）

        enforce: 'pre',
        enforce: 'post',
        // 标识应用这些规则，即使规则覆盖（高级选项）

        loader: 'babel-loader',
        // 应该应用的 loader，它相对上下文解析
        // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
        // 查看 webpack 1 升级指南。

        options: {
          presets: ['es2015'],
        },
        // loader 的可选项
      },
      // rules {Array}配置模块的读取和解析规则，通常用来配置loader
      // 1.条件匹配: 通过test、include、exclude三个配置来命中Loader要应用的规则文件。
      {
        // 匹配规则 这里是匹配所有.html文件
        test: /\.html$/,
        test: '.html$',

        use: [
          // 应用多个 loader 和选项
          'htmllint-loader',
          // 当loader需要传入很多参数时，可以用{Object}来描述
          {
            loader: 'html-loader',
            options: {
              /* ... */
            },
          },
        ],
      },
      // 处理scss的规则
      {
        test: /\.scss$/,
        // use 中 loader 的处理处理顺序是从右到左，即先通过sass-loader处理，返回的结果再通过css-loader处理
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // exclude用来排除文件
        exclude: path.resolve(__dirname, 'node_modules'),
      },

      {
        oneOf: [
          /* rules */
        ],
      },
      // 只使用这些嵌套规则之一

      {
        rules: [
          /* rules */
        ],
      },
      // 使用所有这些嵌套规则（合并可用条件）

      {
        resource: {
          and: [
            /* 条件 */
          ],
        },
      },
      // 仅当所有条件都匹配时才匹配

      {
        resource: {
          or: [
            /* 条件 */
          ],
        },
      },
      {
        resource: [
          /* 条件 */
        ],
      },
      // 任意条件匹配时匹配（默认为数组）

      {
        resource: {
          not: [
            /* 条件 */
          ],
        },
      },
      // 条件不匹配时匹配
    ],

    /* 高级模块配置（点击展示） */
  },

  // 解析模块请求的选项
  // （不适用于对 loader 解析）
  resolve: {
    // 告诉webpack解析模块时应该搜索的目录
    // 优先级从左往右
    modules: ['node_modules', path.resolve(__dirname, 'app')],
    // 用于查找模块的目录

    // webpack尝试按顺序解析这些后缀名， 优先级从左到右
    // 如果多个文件有相同的文件名，但后缀不同，webpack会解析最左边的然后跳过其余
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 作用：比如在js文件中引入模块时不用带扩展名， 默认解析file.js
    // import File from '../path/to/file';

    // 使用的扩展名

    // 创建 import 或 require 的别名，来确保模块引入变得更简单。
    alias: {
      // 模块别名列表

      module: 'new-module',
      // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"

      'only-module$': 'new-module',
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"

      module: path.resolve(__dirname, 'app/third/module.js'),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
    },
    /* 可供选择的别名语法（点击展示） */
    /* 高级解析选项（点击展示） */
  },

  performance: {
    hints: 'warning', // 枚举    maxAssetSize: 200000, // 整数类型（以字节为单位）
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },

  devtool: 'source-map', // enum  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。

  context: __dirname, // string（绝对路径！）
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录解析

  target: 'web', // 枚举  // 包(bundle)应该运行的环境
  // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)

  externals: ['react', /^@angular\//], // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

  stats: 'errors-only', // 精确控制要显示的 bundle 信息

  devServer: {
    compress: true, // enable gzip compression gzip压缩
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin 模块热更新
    https: false, // true for self-signed, object for cert authority
    port: 8000, // 端口号
    proxy: {
      // proxy URLs to backend development server
      '/api': 'http://localhost:3000',
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    noInfo: true, // only errors & warns on hot reload
    // ...
  },

  plugins: [
    // ...
  ],
  // 附加插件列表

  /* 高级配置（点击展示） */
};
