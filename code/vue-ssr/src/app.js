import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import { createRouter } from './router'
import { createStore } from './store'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - 教育',
  },
})
// 导出一个工厂函数，用于创建新的应用程序、router 和 store 实例
// 每一个用户访问的时候都是创建新的实例，避免污染
export function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    render: (h) => h(App),
    router,
    store,
  })
  return { app, router, store }
}
