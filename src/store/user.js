import { defineStore } from "pinia";
import { ref } from "vue";
import { login, register } from "@/api/index";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});
    const userCollect = ref([]);
    const userAte = ref([]);
    const headersObj = ref({})
    const userRegister = async ({ email, username, password }) => {
        await register({ email, username, password });
    };

    const getUserInfo = async ({ email, password }) => {
        userInfo.value = await login({ email, password });
        userCollect.value = focusResult.info.collected;
        userAte.value = focusResult.info.favorites;
        headersObj.value = { Authorization: `Bearer ${userInfo.value.token}` }
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

    //temp
    userInfo.value = {
        id: 12,
        username: "测试用户",
        avatar: "http://localhost:8000/static/img/avatar/12-Snipaste_2023-07-17_15-39-14.png",
        introduction: "暂时没有个性签名~",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJ1c2VyX2lkIjoxMiwidXNlcm5hbWUiOiJcdTZkNGJcdThiZDVcdTc1MjhcdTYyMzciLCJleHAiOjE2OTExMTA1NzJ9.hLs8JK2L2Iqr-vjkH6pYxmEKHhHp-7HZgGpLUMjXVYY"
    };
    return {
        userInfo,
        getUserInfo,
        userLogout,
        userRegister,
        extendUserInfo,
        removeFocus,
        changeInfo,
        userCollect,
        userAte,
        headersObj
    };
}, {
    persist: true,
});
