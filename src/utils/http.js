// axios基础配置
import axios from "axios";
import {useUserStore} from "@/store/user";
import router from '@/router'
import { ElMessage } from 'element-plus'

const http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
})

// 用于标识是否正在刷新令牌
let isRefreshing = false;
// 队列存储待重试请求
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    })

    failedQueue = [];
}

// axios请求拦截器
http.interceptors.request.use(config => {
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
}, e => Promise.reject(e))


// axios响应式拦截器
http.interceptors.response.use(
    res => res.data,
    async e => {
        const userStore = useUserStore();
        const originalRequest = e.config;
        console.log(e.response)

        if (e.response) {
            // 处理401错误
            if (e.response.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return http(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise((resolve, reject) => {
                    userStore.refreshAccessTokenHandler().then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        processQueue(null, token);
                        resolve(http(originalRequest));
                    }).catch(err => {
                        processQueue(err, null);
                        ElMessage({
                            type: 'warning',
                            message: '登录过期，请重新登录',
                        });
                        userStore.userLogout();
                        router.replace('/login');
                        reject(err);
                    }).finally(() => {
                        isRefreshing = false;
                    });
                });
            }

            // 处理403错误
            if (e.response.status === 403) {
                ElMessage({
                    type: 'warning',
                    message: e.response.data.error
                })
                router.replace('/login');
            }

            // 处理500错误
            if (e.response.status === 500) {
                ElMessage({
                    type: 'error',
                    message: '服务器错误，请稍后再试'
                });
            }

            // 处理404错误
            if (e.response.status === 404) {
                router.replace('/NotFound');
            }
        }

        return Promise.reject(e);
    }
);

export default http;
