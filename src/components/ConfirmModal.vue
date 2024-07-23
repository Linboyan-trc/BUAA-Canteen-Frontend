<template>
    <div style="display: inline;">
        <button @click="showModal = true" class="userBtn">{{ exeName }}</button>
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <p>确定要{{ exeName }}吗？</p>
                <button @click="confirm" class="userBtn">确认</button>
                <button @click="showModal = false" class="userBtn">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { deleteAccount } from '@/api';

export default {
    props: {
        exeName: {
            type: String,
            required: true
        }
    },
    setup() {
        const showModal = ref(false);
        const userStore = useUserStore();

        const confirm = async () => {
            if (exeName === '退出登录') {
                const res = await userStore.userLogout();
            } else if (exeName === '注销账号') {
                const res = await userStore.userLogout();
                const msg = await deleteAccount({});
            }
            alert('已' + exeName);
            showModal.value = false;
        };

        return {
            showModal,
            confirm
        };
    }
};
</script>

<style scoped>
.modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
    text-align: center;
}

.modal-content button {
    margin: 10px;
}
</style>