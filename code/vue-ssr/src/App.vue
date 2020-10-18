<template>
  <div id="app" data-server-rendered="true">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '教育',
    }
  },
  methods: {
    click() {
      console.log('Hello World')
    },
  },
}
</script>

<style></style>
