<template>
  <div v-if="isAuthPage">
    <RouterView />
  </div>
  <div v-else>
    <div class="common-layout">
      <el-container>
        <el-header style="width: 100%; height: 15%; border-bottom: 1px solid #ccc">
          <p style="font-size: 1.5em; font-weight: bold; text-align: center;">
            My Web
          </p>
        </el-header>
        <el-container>
          <el-aside style="width: 15%;border-right: 1px solid #ccc">
            <el-scrollbar>
              <el-menu default-active="/HomeView" :router="true" style="border: none;">
                <el-menu-item index="/HomeView">
                  <el-icon><House /></el-icon>
                  <span>首页</span>
                </el-menu-item>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><message /></el-icon>
                    <span>日记</span>
                  </template>
                  <el-menu-item index="/WriteArticleView">写日记</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/SettingView">
                  <el-icon><Setting /></el-icon>
                  <span>设置</span>
                </el-menu-item>
              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-main style="width: 85%;">
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
  </div>
  </div>

  
</template>

<script setup>
import { Message, Setting, House} from '@element-plus/icons-vue'
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isAuthPage = computed(() => route.path === "/login");
</script>

<style>
/* 颜色变量定义 */
:root {
  --primary-color: #4361ee;  /* 主色调 - 科技蓝 */
  --secondary-color: #3f37c9; /* 辅色调 - 深蓝 */
  --accent-color: #4cc9f0;   /* 强调色 - 亮蓝 */
  --success-color: #2ec4b6;  /* 成功色 */
  --warning-color: #ff9f1c;  /* 警告色 */
  --error-color: #e71d36;    /* 错误色 */
  --text-primary: #2b2d42;   /* 主要文字 */
  --text-secondary: #8d99ae; /* 次要文字 */
  --bg-light: #f8f9fa;       /* 浅背景 */
  --bg-dark: #1d1e22;        /* 深背景 */
}

/* 头部渐变优化 */
.el-header {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 侧边栏颜色优化 */
.el-aside {
  background: white;
  border-right: 1px solid #e9ecef;
}

:deep(.el-menu) {
  --el-menu-active-color: var(--primary-color);
  --el-menu-hover-bg-color: rgba(68, 97, 238, 0.05);
}

:deep(.el-menu-item.is-active) {
  background: linear-gradient(
    to right,
    rgba(67, 97, 238, 0.1),
    transparent
  );
  border-left: 4px solid var(--primary-color);
}

/* 主内容区颜色 */
.el-main {
  background: var(--bg-light);
}

/* 状态颜色系统 */
:deep(.success-state) {
  color: var(--success-color);
  background-color: rgba(46, 196, 182, 0.1);
}

:deep(.warning-state) {
  color: var(--warning-color);
  background-color: rgba(255, 159, 28, 0.1);
}

:deep(.error-state) {
  color: var(--error-color);
  background-color: rgba(231, 29, 54, 0.1);
}

/* 文字颜色层级 */
.el-header p {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.content-title) {
  color: var(--text-primary);
  border-left: 4px solid var(--primary-color);
}

:deep(.content-subtitle) {
  color: var(--text-secondary);
}

/* 按钮颜色覆盖 */
:deep(.el-button--primary) {
  background: var(--primary-color);
  border: none;
  transition: all 0.3s;
}

:deep(.el-button--primary:hover) {
  background: var(--secondary-color);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(67, 97, 238, 0.3);
}

/* 暗黑模式适配 */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #edf2f4;
    --text-secondary: #8d99ae;
    --bg-light: #2b2d42;
    --bg-dark: #1d1e22;
  }
  
  .el-header {
    background: linear-gradient(
      135deg,
      #1d1e22,
      #2b2d42
    );
  }
  
  .el-aside {
    background: var(--bg-dark);
    border-right-color: #373940;
  }
  
  .el-main {
    background: var(--bg-dark);
  }
}

/* 颜色过渡动画 */
:deep(.el-menu-item),
:deep(.el-button),
:deep(.el-icon) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 辅助视觉元素 */
:deep(::selection) {
  background: rgba(67, 97, 238, 0.2);
}

:deep(::-webkit-scrollbar-thumb) {
  background-color: rgba(67, 97, 238, 0.4);
  border-radius: 4px;
}
</style>