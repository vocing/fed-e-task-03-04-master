<template>
  <el-card shadow="never">
    <el-menu :default-active="active" @select="onSelect">
      <slot v-for="item in constantRouterMap">
        <el-menu-item
          v-if="
            item.meta &&
            item.meta.type == 'user' &&
            (token || !item.meta.LoginRequired) &&
            (!mini || !item.meta.mini)
          "
          :key="item.path"
          :index="item.path"
        >
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </slot>
    </el-menu>
  </el-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: "",
      mini: "",
      active: "",
      constantRouterMap: [
        {
          meta: {
            type: "user",
            icon: "el-icon-star-off",
            title: "最新动态",
          },
          path: "/user/new/main",
        },
        {
          meta: {
            type: "user",
            icon: "el-icon-mobile-phone",
            title: "社交圈",
          },
          path: "/user/social/main",
        },
        {
          meta: {
            type: "user",
            icon: "el-icon-edit-outline",
            title: "博客列表",
          },
          path: "/user/blog/main",
        },
        {
          meta: {
            type: "user",
            icon: "el-icon-service",
            title: "开源项目",
          },
          path: "/user/project/main",
        },
      ],
    };
  },
  mounted() {
    const len = this.constantRouterMap.length;
    for (let i = 0; i < len; i++) {
      if (this.$route.path.indexOf(this.constantRouterMap[i].path) === 0) {
        this.active = this.constantRouterMap[i].path;
      }
    }
  },
  methods: {
    onSelect(path) {
      if (path) {
        if (path !== this.$route.path) {
          this.$router.push(path);
        }
      }
    },
  },
};
</script>

<style>
</style>