<template>
  <div class="video-page">

    <!-- 标题区 -->
    <div class="header-bar">
      <h2 class="page-title">视频列表</h2>
      <el-button type="primary">上传视频</el-button>
    </div>

    <!-- 表格 -->
    <el-card shadow="hover" class="table-card">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="name" label="名称" width="100" />
        <el-table-column prop="description" label="描述" min-width="260" show-overflow-tooltip />

        <!-- 操作栏 -->
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="{ row }">
            <el-tooltip content="播放" placement="top">
              <el-button
                link
                type="primary"
                size="large"
                @click="playHandleClick(row)"
              >
                <el-icon><VideoPlay /></el-icon>
              </el-button>
            </el-tooltip>

            <el-tooltip content="编辑" placement="top">
              <el-button
                link
                type="primary"
                size="large"
                @click="editHandleClick(row)"
              >
                <el-icon><Edit /></el-icon>
              </el-button>
            </el-tooltip>

            <el-tooltip content="删除" placement="top">
              <el-button
                link
                type="danger"
                size="large"
                @click="deleteHandleClick(row)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { VideoPlay, Edit, Delete } from '@element-plus/icons-vue'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()

const playHandleClick = (row) => {
  router.push({
    name: 'VideoPlayView',
    query: {
      src: row.videoUrl, // ← 这里可替换成 row.videoUrl
      title: row.name
    }
  })
}

const editHandleClick = (row) => {
  console.log('编辑 →', row)
}
const deleteHandleClick = (row) => {
  console.log('删除 →', row)
}

const tableData = [
  {
    date: "2024-01-01",
    name: "视频1",
    description: "这是一个演示",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
]
</script>


<style scoped>
.video-page {
  padding: 20px;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.table-card {
  padding: 12px;
}


</style>
