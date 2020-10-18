<template>
  <div class="layout">
    <Header />
    <Nav />
    <!-- <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </header> -->
    <slot />
  </div>
</template>
<script>
import Header from "./Header";
import Nav from "./Nav";
export default {
  components: {
    Header,
    Nav,
  },
};
</script>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
