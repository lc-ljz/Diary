<template>
    <div class="login-container">
      <div class="form-box">
        <h2>{{ isLogin ? "登录" : "注册" }}</h2>
  
        <el-form ref="formRef" :model="form" :rules="rules" class="login-form">
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱">
              <template #prefix><el-icon><Message /></el-icon></template>
            </el-input>
          </el-form-item>
  
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" show-password>
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
  
          <!-- 仅在注册时显示确认密码选项 -->
          <el-form-item v-if="!isLogin" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" placeholder="请确认密码" show-password>
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
  
          <!-- 仅在登录时显示记住密码选项 -->
          <el-form-item v-if="isLogin">
            <el-checkbox v-model="form.rememberMe" class="remember-checkbox">记住密码</el-checkbox>
          </el-form-item>
  
          <el-button type="primary" @click="submitForm">{{ isLogin ? "登录" : "注册" }}</el-button>
        </el-form>
  
        <p class="toggle-text">
          {{ isLogin ? "没有账号？" : "已有账号？" }}
          <span @click="toggleMode">{{ isLogin ? "去注册" : "去登录" }}</span>
        </p>
      </div>
    </div>
  </template>
  
    <script setup>
  import { ref, reactive, onMounted } from "vue";
  import { Message, Lock } from "@element-plus/icons-vue";
  import { ElMessage } from "element-plus";

  import { login, register } from '@/api/loginregister'
  import { useRouter } from 'vue-router';
 
  const router = useRouter();
  
  const isLogin = ref(true); // 控制登录/注册界面切换
  const formRef = ref(null);
  
  const form = reactive({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false, // 记住密码
  });
  
  // 表单验证规则
  const rules = {
    email: [
      { required: true, message: "请输入邮箱", trigger: "blur" },
      { type: "email", message: "请输入有效的邮箱", trigger: "blur" },
    ],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    confirmPassword: [
      { required: true, message: "请确认密码", trigger: "blur" },
      {
        validator: (_, value) => {
          if (!isLogin.value && value !== form.password) {
            return new Error("两次输入的密码不一致");
          }
          return true;
        },
        trigger: "blur",
      },
    ],
  };
  
  // 组件加载时检查 localStorage 是否保存了密码
  onMounted(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      form.email = savedEmail;
      form.password = savedPassword;
      form.rememberMe = true;
    }
  });
  
  // 提交表单
  const submitForm =  () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        
        const data = {
            email: form.email,
            password: form.password,
        };

        try
        {
            const response = isLogin.value ? await login(data) : await register(data);
            if (response.status === 200) {
                ElMessage.success(isLogin.value ? "登录成功" : "注册成功");

                // 仅登录时保存 token
                if (isLogin.value){

                    const token = response.data.token; 

                     // 保存 token 到 localStorage
                    localStorage.setItem("token", token);
                    // 登录成功后跳转到主页
                    router.push('/');

                    if (form.rememberMe) {
                        localStorage.setItem("savedEmail", form.email);
                        localStorage.setItem("savedPassword", form.password);
                    } else {
                        localStorage.removeItem("savedEmail");
                        localStorage.removeItem("savedPassword");
                    }
                }
                else{
                    isLogin.value = true;
                }            
            }
            else{
                throw new Error(isLogin.value ? "登录失败" : "注册失败");
            }
        }
        catch (error) {
            ElMessage.error(isLogin.value ? "登录失败" : "注册失败");
        }
      } else {
        ElMessage.error("请填写完整信息");
      }
    });
  };
  
  // 切换模式
  const toggleMode = () => {
    isLogin.value = !isLogin.value;
    form.email = "";
    form.password = "";
    form.confirmPassword = "";
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #667eea, #764ba2);
  }
  
  .form-box {
    width: 350px;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .el-input {
    width: 100%;
  }
  
  .el-button {
    width: 100%;
    margin-top: 10px;
  }
  
  .toggle-text {
    margin-top: 15px;
    font-size: 14px;
    color: #666;
  }
  
  .toggle-text span {
    color: #667eea;
    cursor: pointer;
    font-weight: bold;
  }
  
  /* 对齐记住密码与输入框 */
  .remember-checkbox {
    width: 100%;
    margin-top: 10px;
    text-align: left;
  }
  </style>
  