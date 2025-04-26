import { useRouter } from 'vue-router';
 
const router = useRouter();

export function logout(){
    // 清除 localStorage 中的 token 和用户数据
    localStorage.removeItem("token");
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
  
    // 跳转到登录页面
    router.push("/login");
  }

