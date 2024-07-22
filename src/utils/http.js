// axios基础配置
import axios from "axios";
import {useUserStore} from "@/store/user";
import router from '@/router'
import { ElMessage } from 'element-plus'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000',
    timeout: 5000,
})

// axios请求拦截器
http.interceptors.request.use(config => {
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
}, e => Promise.reject(e))


// axios响应式拦截器
http.interceptors.response.use(res => res.data, async e => {
    const userStore = useUserStore();
    const originalRequest = e.config;

    if (e.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            await userStore.refreshAccessTokenHandler();
            originalRequest.headers.Authorization = `Bearer ${userStore.token}`;
            return http(originalRequest);
        } catch (refreshError) {
            ElMessage({
                type: 'warning',
                message: '登录过期，请重新登录',
            });
            await router.replace('/login');
        }
    } else if (e.response.status === 403) {
        ElMessage({
            type: 'warning',
            message: e.response.data.error
        })
        router.replace('/login');
    } else if (e.response.status === 500) {
        ElMessage({
            type: 'error',
            message: '服务器错误，请稍后再试'
        });
    } else if (e.response.status === 404) {
        router.replace('/NotFound');
    }

    return Promise.reject(e);
})


export default http