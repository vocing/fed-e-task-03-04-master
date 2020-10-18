// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuex from 'vuex'
import ElementUI from 'element-ui'
import store from '@/store/index'
import utils from '@/utils/utils'
import markdown from '@/utils/markdown'
import share from '@/utils/share'
import DefaultLayout from '~/layouts/Default.vue'
import 'element-ui/lib/theme-chalk/index.css'

export default function (Vue, { appOptions, router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(ElementUI)
  Vue.component('Layout', DefaultLayout)
  Vue.use(Vuex)
  Vue.use(utils)
  Vue.use(markdown)
  Vue.use(share)
  
  appOptions.store = store
}
