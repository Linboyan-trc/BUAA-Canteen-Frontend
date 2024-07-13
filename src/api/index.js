import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default {
    getDishes() {
        return apiClient.get('/dishes');
    },
    getDish(id) {
        return apiClient.get(`/dishes/${id}`);
    }
    //TODO 其他API方法
}