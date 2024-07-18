import { defineStore } from "pinia";
import { ref } from "vue";
import { login, Register } from "@/api/index";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});
    const userCollect = ref([]);
    const userAte = ref([]);
    const headersObj = ref({})
    const userRegister = async ({ email, username, password }) => {
        await Register({ email, username, password });
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

    const changeInfo = ({ username, signature, avatar }) => {
        userInfo.value.username = username;
        userInfo.value.signature = signature;
        userInfo.value.avatar = avatar;
    };

    return {
        userInfo,
        getUserInfo,
        userLogout,
        userRegister,
        extendUserInfo,
        changeInfo,
        userCollect,
        userAte,
        headersObj
    };
}, {
    persist: true,
});
