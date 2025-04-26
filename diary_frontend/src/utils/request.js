import axios from 'axios'


// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: 'http://localhost:7777/',
    // 超时
    timeout: 10000
  })


// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');
    
    // 如果 token 存在，就将其附加到请求头中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // 常见做法是使用 Bearer token
    }

    // 可以在请求头中加入 token 或其他参数，如果需要的话
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 处理响应数据
    return response;
  },
  (error) => {
    // 处理响应错误
    
    // 请求失败响应处理，处理请求超时错误
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时，请稍后再试');
    }

    return Promise.reject(error);
  }
);


export default service 
