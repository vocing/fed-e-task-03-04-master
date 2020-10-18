<template>
  <section ref="pageHeader" class="page-header">
    <div style="position: absolute; top: 20px; right: 20px; z-index: 2">
      <el-tooltip
        effect="dark"
        :content="fullButton.full ? '退出' : '全屏'"
        placement="bottom-end"
      >
        <el-button
          @click="fullScreen"
          :icon="fullButton.full ? 'el-icon-close' : 'el-icon-rank'"
          circle
        ></el-button>
      </el-tooltip>
    </div>
    <div
      v-for="(item, index) in music"
      :key="`_${index}`"
      :style="`position: absolute; left: ${item.x}px; top: ${item.y}px; z-index: 1;`"
    >
      <font :style="`font-size: ${item.fontSize}px; color: rgb(255, 255, 255);`"
        ><b>♪</b></font
      >
    </div>
    <h1 class="project-name">{{ $static.post.configuration.blogTitle }}</h1>
    <h2 class="project-tagline">
      {{ $static.post.configuration.blogDescribe }}
    </h2>
    <a :href="$static.post.info.html_url" target="_blank" class="btn"
      >GitHub主页</a
    >
    <a :href="`${$static.post.info.html_url}/vblog`" target="_blank" class="btn"
      >博客源码</a
    >
  </section>
</template>

<static-query>
query{
  post (id: 1) {
    configuration {
      blogTitle
      blogDescribe
      htmlTitle
    }
    info {
      html_url
    }
  }
}
</static-query>

<script>
import axios from "axios";

export default {
  name: "layout-header",
  metaInfo() {
    return {
      title: this.$static.post.configuration.htmlTitle,
    };
  },
  data() {
    return {
      fullButton: {
        full: false,
      },
      music: [],
      title: "",
    };
  },
  mounted() {
    this.setMusicPosition();
  },
  methods: {
    fullScreen() {
      this.fullButton.full = !this.fullButton.full;
      const element = document.documentElement;
      if (window.ActiveXObject) {
        var WsShell = new ActiveXObject("WScript.Shell");
        this.fullButton.full
          ? WsShell.SendKeys("{F11}")
          : WsShell.SendKeys("{F11}");
      }
      //HTML W3C 提议
      else if (element.requestFullScreen) {
        this.fullButton.full
          ? element.requestFullScreen()
          : document.exitFullscreen();
      }
      //IE11
      else if (element.msRequestFullscreen) {
        this.fullButton.full
          ? element.msRequestFullscreen()
          : document.msExitFullscreen();
      }
      // Webkit (works in Safari5.1 and Chrome 15)
      else if (element.webkitRequestFullScreen) {
        this.fullButton.full
          ? element.webkitRequestFullScreen()
          : document.webkitCancelFullScreen();
      }
      // Firefox (works in nightly)
      else if (element.mozRequestFullScreen) {
        this.fullButton.full
          ? element.mozRequestFullScreen()
          : document.mozCancelFullScreen();
      }
    },
    getHeaderSize() {
      const pageHeader = this.$refs.pageHeader;
      return {
        width: pageHeader.offsetWidth,
        height: pageHeader.offsetHeight,
      };
    },
    setMusicPosition() {
      const size = this.getHeaderSize();
      const len = 8 + Math.ceil(Math.random() * 10);
      this.music = new Array(len).fill(null).map(() => {
        return {
          x: Math.random() * size.width,
          y: Math.random() * size.height,
          fontSize: Math.ceil(22 + Math.random() * 14),
        };
      });
    },
  },
};
</script>

<style>
.page-header {
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
}

.project-name {
  font-size: 3.25rem;
  margin-top: 0;
  margin-bottom: 0.1rem;
}

.project-tagline {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: 400;
  opacity: 0.7;
}

.btn {
  padding: 0.75rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  color: hsla(0, 0%, 100%, 0.7);
  background-color: hsla(0, 0%, 100%, 0.08);
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
  margin-left: 1rem;
}

.btn:first-child {
  margin-left: 0;
}

.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.el-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}

.el-button:focus,
.el-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.page-header {
  background-image: linear-gradient(
    120deg,
    rgb(38, 144, 249),
    rgb(252, 45, 45)
  );
  color: rgb(255, 255, 255);
}
</style>