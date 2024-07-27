import { defineStore } from "pinia";
import { ref } from "vue";
import {login, register, refreshAccessToken, logout, getUserInfo, getUserActionInfo} from "@/api/user.js";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});
    const userCollectDishes = ref([]);
    const userCollectCounters = ref([]);
    const userCollectCafeterias = ref([]);
    const userAte = ref([]);
    const headersObj = ref({})
    const token = ref('');

    const userRegister = async ({ email, username, password }) => {
        await register({ email, username, password });
    };

    const userLogin = async ( email, password ) => {
        const response = await login({ email, password });

        if (response.success) {
            // 1. 返回数据
            const { token, refresh_token, username } = response.data;

            // 2. 设置token
            setToken(token);
            document.cookie = `refresh_token=${refresh_token}; path=/; HttpOnly`; // 保存 refresh_token 到 cookie
            
            // 3. 设置用户信息
            userInfo.value = { email: email , username: username };

            // 4. 获取用户个人信息
            const res = await getUserInfo();
            userInfo.value.userId = res.data.id;
            console.log(`用户id是${userInfo.value.userId}`);
            userInfo.value.studentId = res.data.student_id;
            userInfo.value.gender = res.data.gender;
            userInfo.value.introduction = res.data.introduction;
            userInfo.value.avatar = res.data.avatar;

            // 5. 获取用户行为数据
            const resp = await getUserActionInfo();
            console.log(`用户登录后获取的食物信息:${resp}`);
            console.log(`用户登录后获取的食物信息:${resp.data}`);
            console.log(`用户登录后获取的食物信息ateId:${resp.data.ateId}`);
            userAte.value = resp.data.ateId;
            userCollectDishes.value = resp.data.collectDishesId;
            userCollectCounters.value = resp.data.collectCountersId;
            userCollectCafeterias.value = resp.data.collectCafeteriasId;
            console.log(`用户登录后获取的食物信息collectDishesId:${resp.data.collectDishesId}`);
            console.log(`用户登录后获取的食物信息collectCountersId:${resp.data.collectCountersId}`);
            console.log(`用户登录后获取的食物信息collectCafeteriasId:${resp.data.collectCafeteriasId}`);
            return username;
        } else {
            return null;
        }
    }

    const extendUserInfo = (type, id) => {
        if (type === 'ate') {
            userAte.value = [...userAte.value, id];
        } else if (type === 'dish') {
            userCollectDishes.value = [...userCollectDishes.value, id];
        } else if (type === 'counter') {
            userCollectCounters.value = [...userCollectCounters.value, id];
        } else if (type === 'cafeteria') {
            userCollectCafeterias.value = [...userCollectCafeterias.value, id];
        } else {
            console.log("extendUserInfo失败: 没有这个类型")
        }
    };

    const removeUserInfo = (type, id) => {
        if (type === 'ate') {
            const index = userAte.value.indexOf(id);
            if (index !== -1) {
                userAte.value.splice(index, 1);
            }
        } else if (type === 'dish') {
            const index = userCollectDishes.value.indexOf(id);
            if (index !== -1) {
                userCollectDishes.value.splice(index, 1);
            }
        } else if (type === 'counter') {
            const index = userCollectCounters.value.indexOf(id);
            if (index !== -1) {
                userCollectCounters.value.splice(index, 1);
            }
        } else if (type === 'cafeteria') {
            const index = userCollectCafeterias.value.indexOf(id);
            if (index !== -1) {
                userCollectCafeterias.value.splice(index, 1);
            }
        }
    };

    const userLogout = async () => {
        try {
            await logout(); // 先调用 logout API
            userInfo.value = {};
            userCollectDishes.value = [];
            userCollectCounters.value = [];
            userCollectCafeterias.value = [];
            userAte.value = [];
            token.value = '';
            headersObj.value = {};
            localStorage.removeItem('token');
            document.cookie = `refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
            return { info: "成功退出登录" };
        } catch (error) {
            console.error('退出登录失败:', error);
        }
    };
    
    const changeInfo = ({username, email, gender, introduction, student_id, avatar}) => {
        userInfo.value.username = username;
        userInfo.value.email = email;
        userInfo.value.gender = gender;
        userInfo.value.introduction = introduction;
        userInfo.value.avatar = avatar;
        userInfo.value.student_id = student_id;
    };

    // 以下是登陆认证等功能函数

    const getRefreshTokenFromCookie = () => {
        const name = 'refresh_token=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    };

    const refreshAccessTokenHandler = async () => {
        try {
            const refreshToken = getRefreshTokenFromCookie();
            const response = await refreshAccessToken(refreshToken);
            token.value = response.data.token;
            headersObj.value = { Authorization: `Bearer ${token.value}` };
            localStorage.setItem('token', token.value);
        } catch (error) {
            console.error('刷新token失败:', error);
        }
    };

    const setToken = (newToken) => {
        token.value = newToken;
        headersObj.value = { Authorization: `Bearer ${newToken}` };
        localStorage.setItem('token', newToken);
    };

    // userInfo.value = {
    //     id: 12,
    //     username: "测试用户",
    //     avatar: "http://localhost:8000/static/img/avatar/12-Snipaste_2023-07-17_15-39-14.png",
    //     introduction: "暂时没有个性签名~",
    //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJ1c2VyX2lkIjoxMiwidXNlcm5hbWUiOiJcdTZkNGJcdThiZDVcdTc1MjhcdTYyMzciLCJleHAiOjE2OTExMTA1NzJ9.hLs8JK2L2Iqr-vjkH6pYxmEKHhHp-7HZgGpLUMjXVYY"
    // };
    
    return {
        userInfo,
        userLogin,
        userLogout,
        userRegister,
        extendUserInfo,
        removeUserInfo,
        changeInfo,
        userCollectDishes,
        userCollectCounters,
        userCollectCafeterias,
        userAte,
        headersObj,

        // 以下是登陆认证等功能函数
        token,
        refreshAccessTokenHandler,
        setToken
    };

}, {
    persist: true,
});
