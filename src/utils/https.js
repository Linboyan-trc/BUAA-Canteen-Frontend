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
    if (userStore.userInfo.token) {
        config.headers.Authorization = `Bearer ${userStore.userInfo.token}`
    }
    return config
}, e => Promise.reject(e))


// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
    if (e.response.status === 401) {
        ElMessage({
            type: 'warning',
            message: e.response.data.error
        })
        const userStore = useUserStore();
        userStore.userLogout()
        router.replace('/')
    }
    if(e.response.status === 404){
        router.replace('/NotFound')
    }
    if(e.response.status === 403){
        ElMessage({
            type: 'warning',
            message: e.response.data.error
        })
        router.replace('/login')
    }
    if (e.response.status === 500) {
        ElMessage({
            type: 'error',
            message: '服务器错误，请稍后再试'
        });
    }
    
    return Promise.reject(e)
})


export default http