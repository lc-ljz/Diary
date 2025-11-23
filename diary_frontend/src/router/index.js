import { createRouter, createWebHistory } from 'vue-router'
import WriteArticleView from '../components/WriteArticleView.vue'
import ArticleView from '../components/ArticleView.vue'
import SettingView from '../components/SettingView.vue'
import HomeView from '../components/HomeView.vue'
import VideoPlayView from '../components/VideoPlayView.vue'
import VideoView from '../components/VideoView.vue'
import LLMView from '../components/LLMView.vue'
import LoginRegisterView from '../components/LoginRegisterView.vue'

const routes = [
  { path: "/", redirect: "/HomeView" },
  { path: '/HomeView', name: 'HomeView', component: HomeView },
  { path: '/WriteArticleView', name: 'WriteArticleView', component: WriteArticleView},
  { path: '/ArticleView', name: 'ArticleView', component: ArticleView},
  { path: '/VideoPlayView', name:'VideoPlayView', component: VideoPlayView},
  { path: '/VideoView', name:'VideoView', component: VideoView},
  { path: '/LLMView', name:'LLMView', component: LLMView},
  { path: '/SettingView', name: 'SettingView', component: SettingView, meta: { requiresAuth: true } },
  { path: "/login", name: "LoginRegister", component: LoginRegisterView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问需要权限的页面，检查 token 是否存在
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // 如果没有 token，重定向到登录页面
      next('/login');
    } else {
      // 如果有 token，继续访问页面
      next();
    }
  } else {
    // 不需要权限的页面，直接访问
    next();
  }
});

export default router
