<template>
  <div v-if="isAuthPage">
    <RouterView />
  </div>
  <div v-else>
    <el-container style="height: 100vh;">
      <!-- 头部 -->
      <el-header style="display: flex; align-items: center; justify-content: space-between;">
        <p class="header-title">My Web</p>
        <!-- 移动端菜单按钮 -->
        <el-button
          v-if="isMobile"
          icon="Menu"
          @click="drawerVisible = true"
          type="primary"
          circle
        />
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside
          v-if="!isMobile"
          :width="asideWidth"
        >
          <el-scrollbar style="height: 100%;">
            <el-menu default-active="/HomeView" :router="true" style="border: none;">
              <el-menu-item index="/HomeView">
                <el-icon><House /></el-icon>
                <span>首页</span>
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><Message /></el-icon>
                  <span>文章</span>
                </template>
                <el-menu-item index="/ArticleView">文章记录</el-menu-item>
                <el-menu-item index="/WriteArticleView">写文章</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="/VideoView">
                <el-icon><Film /></el-icon>
                <span>视频</span>
              </el-menu-item>
              <el-menu-item index="/LLMView">
                <el-icon><Comment /></el-icon>
                <span>大模型</span>
              </el-menu-item>
              <el-menu-item index="/SettingView">
                <el-icon><Setting /></el-icon>
                <span>设置</span>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <!-- 主内容 -->
        <el-main>
          <RouterView />
        </el-main>
      </el-container>

      <!-- 移动端抽屉菜单 -->
      <el-drawer
        v-model="drawerVisible"
        direction="ltr"
        size="200px"
        :with-header="false"
      >
        <el-menu default-active="/HomeView" :router="true" style="border: none;">
          <el-menu-item index="/HomeView">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Message /></el-icon>
              <span>日记</span>
            </template>
            <el-menu-item index="/WriteArticleView">写日记</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/SettingView">
            <el-icon><Setting /></el-icon>
            <span>设置</span>
          </el-menu-item>
        </el-menu>
      </el-drawer>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { Message, Setting, House, Comment, Film } from "@element-plus/icons-vue";

const route = useRoute();
const isAuthPage = computed(() => route.path === "/login");

// 响应式宽度
const windowWidth = ref(window.innerWidth);
const asideWidth = computed(() => (windowWidth.value < 1024 ? "0px" : "200px"));
const isMobile = computed(() => windowWidth.value < 768);
const drawerVisible = ref(false);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style>
/* 颜色变量 */
:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --accent-color: #4cc9f0;
  --success-color: #2ec4b6;
  --warning-color: #ff9f1c;
  --error-color: #e71d36;
  --text-primary: #2b2d42;
  --text-secondary: #8d99ae;
  --bg-light: #f8f9fa;
  --bg-dark: #1d1e22;
}

/* 头部 */
.el-header {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
}
.header-title {
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

/* 侧边栏 */
.el-aside {
  background: white;
  border-right: 1px solid #e9ecef;
}
:deep(.el-menu-item.is-active) {
  background: linear-gradient(to right, rgba(67, 97, 238, 0.1), transparent);
  border-left: 4px solid var(--primary-color);
}
:deep(.el-menu) {
  --el-menu-active-color: var(--primary-color);
  --el-menu-hover-bg-color: rgba(68, 97, 238, 0.05);
}

/* 主内容 */
.el-main {
  background: var(--bg-light);
  padding: 16px;
  overflow-y: auto;
}

.editor-container {
  height: 100%;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .el-aside {
    width: 0;
  }
}

@media (max-width: 768px) {
  .el-header p {
    font-size: 1.2em;
  }
  .el-main {
    padding: 8px;
  }
}

/* 暗黑模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #edf2f4;
    --text-secondary: #8d99ae;
    --bg-light: #2b2d42;
    --bg-dark: #1d1e22;
  }

  .el-header {
    background: linear-gradient(135deg, #1d1e22, #2b2d42);
  }

  .el-aside {
    background: var(--bg-dark);
    border-right-color: #373940;
  }

  .el-main {
    background: var(--bg-dark);
  }
}

/* html/body 100% 高度，去掉默认 margin */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* 避免全局滚动条 */
}

/* 保证 el-main 和子容器高度100% */
.el-main, .editor-container {
  height: 100%;
}

</style>
