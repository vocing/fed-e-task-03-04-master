<template>
  <div></div>
</template>

<script>
export default {
  metaInfo: {
    title: "Hello, world!",
  },
  created() {
    this.$router.replace("/user/new/main");
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
