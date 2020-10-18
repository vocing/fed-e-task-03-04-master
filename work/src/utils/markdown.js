import marked from "marked";
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$markdown', {
      value: this.marked,
      writable: false
    })
  },
  marked (val) {
    return marked(val)
  }
}