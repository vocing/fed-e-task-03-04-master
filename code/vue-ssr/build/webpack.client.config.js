const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  // 将 entry 指向应用程序的 server entry 文件
  entry: {
    app: './src/entry-client.js',
  },
  module: {
    rules: [
      // 仅客户端才转化
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true,
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity,
    },
  },
  plugins: [
    // 输出目录中生成 `vue-ssr-client-manifest.json`
    new VueSSRClientPlugin(),
  ],
})
