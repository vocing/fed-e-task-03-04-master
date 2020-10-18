// entry-server.js
import { createApp } from './app'

export default async (context) => {
  /**
   * 因为有可能是异步路由钩子或函数
   * 所以返回promise
   * 便于服务器能够等待所有的内容在渲染前准备好
   */
  const { app, router, store } = createApp()

  const meta = app.$meta()

  router.push(context.url)
  context.meta = meta

  await new Promise(router.onReady.bind(router))

  context.rendered = () => {
    /**
     * Renderer 会把 context.state 数据对象中内联到界面模板中
     * 最终发送给客户端的界面中会包含一段脚本window.__INITIAL_STATE__ = context.state
     * 客户端就要把界面中的 window.__INITIRAL_STATE__ 拿出来填充到客户端 store 容器中
     */
    context.state = store.state
  }
  return app
}
