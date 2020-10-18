<template>
  <div
    style="
      position: relative;
      z-index: 2;
      margin: auto;
      margin-top: -30px;
      width: 64rem;
    "
  >
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <el-row>
        <el-col :span="10">
          <el-menu mode="horizontal" menu-trigger="click">
            <el-submenu index="#more">
              <template slot="title">了解博主</template>
              <el-menu-item
                index="#githubHome"
                @click="open('https://github.com/GitHub-Laziji')"
                >github主页</el-menu-item
              >
              <el-menu-item index="#blog" @click="open('https://laboo.top/')"
                >其他博客</el-menu-item
              >
            </el-submenu>
            <el-submenu index="#webSites" v-if="webSites.length > 0">
              <template slot="title">其他网站</template>
              <el-menu-item
                :index="'#webSites-' + index"
                v-for="(item, index) in webSites"
                :key="'#webSites' + index"
                @click="open(item.link)"
                >{{ item.name }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col
          :span="8"
          style="text-align: center; padding: 12px 0px 0px 10px"
        >
          <el-row>
            <el-col :span="4">
              <el-popover placement="top" trigger="hover">
                <div style="text-align: center">
                  <el-progress
                    color="#67C23A"
                    type="circle"
                    :percentage="music.volume"
                  ></el-progress>
                  <br />
                  <el-button
                    @click="changeVolume(-10)"
                    icon="el-icon-minus"
                    circle
                  ></el-button>
                  <el-button
                    @click="changeVolume(10)"
                    icon="el-icon-plus"
                    circle
                  ></el-button>
                </div>

                <el-button
                  @click="play"
                  id="play"
                  slot="reference"
                  :icon="
                    music.isPlay ? 'el-icon-refresh' : 'el-icon-caret-right'
                  "
                  circle
                ></el-button>
              </el-popover>
            </el-col>
            <el-col :span="14" style="padding-left: 20px">
              <el-slider
                @change="changeTime"
                :format-tooltip="formatTime"
                :max="music.maxTime"
                v-model="music.currentTime"
                style="width: 100%"
              ></el-slider>
            </el-col>
            <el-col
              :span="6"
              style="padding: 9px 0px 0px 10px; color: #909399; font-size: 13px"
            >
              {{ formatTime(music.currentTime) }}/{{
                formatTime(music.maxTime)
              }}
            </el-col>
          </el-row>

          <audio ref="music" loop autoplay v-if="audioAutoPlay">
            <source :src="audioUrl" type="audio/mpeg" />
          </audio>
          <audio ref="music" loop v-else>
            <source :src="audioUrl" type="audio/mpeg" />
          </audio>
        </el-col>
        <el-col :span="4" style="text-align: right">
          <div style="font-size: 20px; color: #606266; margin-top: 5px">
            <b>{{ $static.post.info.login }}</b>
          </div>
          <div style="color: #606266">
            <i class="el-icon-location"></i>&nbsp;{{
              $static.post.info.location
                ? $static.post.info.location
                : "未填写地址"
            }}
            <br />
          </div>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <img
            v-popover:bigAvatar
            :src="$static.post.info.avatar_url"
            style="
              margin-top: 4px;
              margin-right: 10px;
              width: 52px;
              height: 52px;
              border-radius: 5px;
              border: 1px solid #ebeef5;
            "
          />
          <el-popover
            ref="bigAvatar"
            placement="top-start"
            :title="$static.post.info.name"
            width="200"
            trigger="hover"
          >
            <i class="el-icon-star-on"></i>&emsp;{{ $static.post.info.login }}
            <br />
            <i class="el-icon-location"></i>&emsp;{{
              $static.post.info.location
            }}
            <br />
            <img
              :src="$static.post.info.avatar_url"
              style="width: 200px; height: 200px"
            />
          </el-popover>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<static-query>
query{
  post (id: 1) {
    info {
      name
      login
      location
      avatar_url
    }
  }
}
</static-query>

<script>
import moment from "moment";
export default {
  data() {
    return {
      webSites: [
        {
          name: "segmentfault",
          link: "https://segmentfault.com/",
        },
      ],
      music: {
        isPlay: false,
        currentTime: 0,
        maxTime: 0,
        volume: 100,
      },
      audioAutoPlay: false,
      audioUrl:
        "http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3",
    };
  },
  methods: {
    open(adress, blank = "newwindow") {
      adress && window.open(adress, blank);
    },
    changeVolume(v) {
      this.music.volume += v;
      if (this.music.volume > 100) {
        this.music.volume = 100;
      }
      if (this.music.volume < 0) {
        this.music.volume = 0;
      }
      this.$refs.music.volume = this.music.volume / 100;
    },
    formatTime(time, type) {
      return moment(time).format("mm:ss");
    },
    changeTime() {},
    play() {},
  },
};
</script>

<style>
</style>