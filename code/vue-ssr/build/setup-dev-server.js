const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const resolve = (file) => path.resolve(__dirname, file)
module.exports = (server, callback) => {
  let ready = () => {}
  const onReady = new Promise((r) => r())

  let template
  let serverBundle
  let clientManifest

  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready()
      callback(serverBundle, template, clientManifest)
    }
  }

  const templatePath = path.resolve(__dirname, '../index.template.html')
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })

  const serverConfig = require('./webpack.server.config')
  const serverCompiler = webpack(serverConfig)
  // 编译结果存储在内存中
  const serverDevMiddleware = devMiddleware(serverCompiler, {
    logLevel: 'silent', //关闭日志
  })
  // 为serverCompiler添加钩子, 数据变更时更新内存
  serverCompiler.hooks.done.tap('server', () => {
    serverBundle = JSON.parse(
      serverDevMiddleware.fileSystem.readFileSync(
        resolve('../dist/vue-ssr-server-bundle.json'),
        'utf-8'
      )
    )
    // console.log(1, serverBundle)
    update()
  })

  const clientConfig = require('./webpack.client.config')
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  clientConfig.entry.app = [
    'webpack-hot-middleware/client.js', // 和服务端交互处理热更新的客户端脚本
    clientConfig.entry.app,
  ]
  // 热更新模式下确保一致的hash(或者不使用hash)
  clientConfig.output.filename = '[name].js'

  const clientCompiler = webpack(clientConfig)
  // 编译结果存储在内存中
  const clientDevMiddleware = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    logLevel: 'silent', //关闭日志
  })
  // clientManifest = JSON.parse(
  //   clientDevMiddleware.fileSystem.readFileSync(
  //     resolve('../dist/vue-ssr-client-manifest.json')
  //   )
  // )
  // 为clientCompiler添加钩子, 数据变更时更新内存
  clientCompiler.hooks.done.tap('client', () => {
    clientManifest = JSON.parse(
      clientDevMiddleware.fileSystem.readFileSync(
        resolve('../dist/vue-ssr-client-manifest.json')
      )
    )
    // console.log(2, clientManifest)
    update()
  })
  update()

  // 客户端构建, 一定要把 clientDevMiddleware 挂载到 express 服务中, 提供对其内部内存中数据的访问
  server.use(clientDevMiddleware)

  server.use(
    hotMiddleware(clientCompiler, {
      log: false,
    })
  )
  return onReady
}
