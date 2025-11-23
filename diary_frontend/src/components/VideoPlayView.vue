<template>
  <div class="video-page">
    <!-- 返回按钮 -->
    <el-page-header @back="goBack" class="header-bar">
      <template #content>
        <span class="title">{{ title }}</span>
      </template>
    </el-page-header>

    <!-- 视频播放组件 -->
    <video-play
      v-if="options.src"
      :options="options"
      class="video-player"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VideoPlay from "vue3-video-play"
import "vue3-video-play/dist/style.css"

const route = useRoute()
const router = useRouter()

const title = route.query.title || '视频播放'

const options = ref({
  src: route.query.src || "",
  width: '100%',
  height: 'auto',
  autoplay: false,
  controls: true,
  type: 'video/mp4'
})

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.video-page {
  padding: 10px;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.video-player {
  margin-top: 10px;
}
</style>
