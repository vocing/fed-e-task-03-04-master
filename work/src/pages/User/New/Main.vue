<template>
  <Layout>
    <div style="min-height: 600px" :loading="loading">
      <el-card shadow="never" style="min-height: 400px" v-if="blog.id">
        <div slot="header">
          <span>{{ blog.title }}</span>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布 {{ blog.createTime }} <br />
          更新 {{ blog.updateTime }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            border-bottom: 1px solid #e4e7ed;
            padding: 5px 0px 5px 0px;
          "
        >
          <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
        </div>
        <div
          v-html="blog.content"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-if="!blog.id"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      query: {
        page: 1,
        pageSize: 1,
      },
      loading: false,
      blog: {
        id: "",
        url: "",
        title: "",
        content: "",
        description: "",
        createTime: "",
        updateTime: "",
      },
    };
  },
  mounted() {
    this.gists();
  },
  methods: {
    async gists() {
      const response = await axios.get(
        "https://api.github.com/users/GitHub-Laziji/gists?page=1&per_page=1",
        this.query
      );
      this.loading = true;
      let result = response.data;
      if (!result || result.length == 0) {
        this.loading = false;
        return;
      }
      for (let key in result[0].files) {
        this.blog.id = result[0]["id"];
        this.blog.url = result[0]["url"];
        break;
      }
      this.single();
    },
    async single() {
      if (!this.blog.url) return;
      const response = await axios.get(this.blog.url);
      let result = response.data;
      for (let key in result.files) {
        this.blog["title"] = key;
        this.blog["content"] = this.$markdown(result.files[key]["content"]);
        this.blog["description"] = result["description"];
        this.blog["createTime"] = moment(result["created_at"]).format(
          "YYYY MM DD hh:mm:ss"
        );
        this.blog["updateTime"] = moment(result["updated_at"]).format(
          "YYYY MM DD hh:mm:ss"
        );
        break;
      }
      this.loading = false;
    },
  },
};
</script>

<style>
.markdown-body img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}
</style>