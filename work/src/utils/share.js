import { MessageBox } from 'element-ui'
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$share', {
      value: this.share,
      writable: false
    })
  },
  share (val) {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.value = val === undefined ? window.location.href : val
    input.select()
    document.execCommand("copy")
    input.remove()
    MessageBox.alert(
      '链接已复制,去分享给好友吧!!',
      '分享',
      {
        iconClass: 'el-icon-success'
      }
    )
  }
}