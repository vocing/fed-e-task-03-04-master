<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      {{ post.title }}
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      // posts: [],
    }
  },
  computed: {
    ...mapState(['posts']),
  },
  // Vue Ssr 特殊的生命周期, 服务端渲染的钩子函数
  serverPrefetch() {
    console.log(`start get posts`)
    return this.getPosts()
  },
  async created() {},
  methods: {
    ...mapActions(['getPosts']),
  },
}
</script>

<style></style>
