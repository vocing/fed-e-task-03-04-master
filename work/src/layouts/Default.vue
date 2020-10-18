<template>
  <div class="layout">
    <Header />
    <Nav />
    <section class="main-content">
      <el-row>
        <el-col :span="6" style="padding-right: 10px">
          <Menu />
        </el-col>
        <el-col :span="18" style="padding-left: 10px">
          <slot />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<static-query>
query{
  post (id: 1) {
    configuration {
      githubUsername
    }
  }
}
</static-query>

<script>
import Header from "./Header";
import Nav from "./Nav";
import Menu from "./Menu";
export default {
  components: {
    Header,
    Nav,
    Menu,
  },
  created() {
    this.$store.dispatch("LocalReload", {
      githubUsername: this.$static.post.configuration.githubUsername,
    });
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
a {
  color: #1e6bb8;
}

.main-content {
  max-width: 64rem;
  padding: 30px 0;
  font-size: 1.1rem;
  min-height: 800px;
}

.main-content {
  margin: 0 auto;
}
</style>
