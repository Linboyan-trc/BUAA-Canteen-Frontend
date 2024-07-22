import { defineStore } from "pinia";
import { ref } from "vue";
import {login, register, refreshAccessToken, logout} from "@/api/index";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});
    const userCollect = ref([]);
    const userAte = ref([]);
    const headersObj = ref({})
    const token = ref('');

    const userRegister = async ({ email, username, password }) => {
        await register({ email, username, password });
    };

    const userLogin = async ( email, password ) => {
        const response = await login({ email, password });
        const { token, refresh_token, username, message } = response.data;
        if (message) {
            setToken(token);
            document.cookie = `refresh_token=${refresh_token}; path=/; HttpOnly`; // 保存 refresh_token 到 cookie
            userInfo.value = { email: email , username: username};
            return email;
        } else {
            return null;
        }
    }

    const getUserInfo = async ({ email, password }) => {
        // 感觉这里不需要调用登陆的api，只需要调用获取用户信息的api就行。但是要保证这个函数一定是用户登陆了之后才调用的
        // 登陆了之后，会在localStorage里面存储token，到后端是可以直接定位到是哪个用户的
        // 等需要调用这个函数的时候再更改这里面的逻辑吧

        const response = await login({ email, password });
        userInfo.value = response.data;

        // 这里还需要调其他的api
        // userCollect.value = focusResult.info.collected;
        // userAte.value = focusResult.info.favorites;

        // headersObj.value = { Authorization: `Bearer ${response.data.token}` };
    };

    const extendUserInfo = (type, id) => {
        if (type === 1) {
            userAte.value = [...userAte.value, id];
        } else if (type === 2) {
            userCollect.value = [...userCollect.value, id];
        }
    };

    const removeFocus = (type, id) => {
        if (type === 1) {
            const index = userAte.value.indexOf(id);
            if (index !== -1) {
                userAte.value.splice(index, 1);
            }
        } else if (type === 2) {
            const index = userCollect.value.indexOf(id);
            if (index !== -1) {
                userCollect.value.splice(index, 1);
            }
        }
    };

    const userLogout = async () => {
        userInfo.value = {};
        token.value = '';
        localStorage.removeItem('token');
        document.cookie = `refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly`;
        await logout();
        return { info: "成功退出登录" };
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


    //temp
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
        getUserInfo,
        userLogout,
        userRegister,
        extendUserInfo,
        removeFocus,
        changeInfo,
        userCollect,
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
