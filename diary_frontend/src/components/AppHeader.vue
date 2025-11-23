<template>
  <el-page-header
    v-if="showBack"
    @back="back"
    class="app-header"
  >
    <template #content>
      <span class="title">{{ title }}</span>
    </template>
  </el-page-header>
  
  <div v-else class="app-header no-back">
    <span class="title">{{ title }}</span>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const props = defineProps({
  title: {
    type: String,
    default: "标题"
  },
  back: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()

const back = () => {
  if (props.back) router.back()
}

// 控制是否显示返回箭头
const showBack = props.back
</script>

<style scoped>
.app-header {
  padding: 10px 0;
}
.title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}
.no-back {
  display: flex;
  align-items: center;
  padding-left: 12px;
}
</style>
