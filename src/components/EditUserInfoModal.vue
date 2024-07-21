<template>
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h3>编辑用户信息</h3>
            <h5>只需填写你想修改的部分</h5>
            <form @submit.prevent="submitForm">
                <div class="edit-item">
                    <label for="avatar">头像:</label>
                    <input type="file" id="avatar" @change="handleAvatarChange" />
                </div>
                <div class="edit-item">
                    <label for="username">用户名:</label>
                    <input type="text" id="username" v-model="formData.username" />
                </div>
                <div class="edit-item">
                    <label for="student_id">学号:</label>
                    <input type="text" id="student_id" v-model="formData.student_id" />
                </div>
                <div class="edit-item">
                    <label for="email">邮箱:</label>
                    <input type="email" id="email" v-model="formData.email" />
                </div>
                <div class="edit-item">
                    <label for="gender">性别:</label>
                    <select id="gender" v-model="formData.gender">
                        <option value=null disabled selected>请选择性别</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                        <option value=null>不展示性别</option>
                    </select>
                </div>
                <div class="edit-item">
                    <label for="introduction">个人介绍:</label>
                    <input type="text" id="introduction" v-model="formData.introduction" />
                </div>
                <div class="edit-item">
                    <label for="oldPassword">旧密码:</label>
                    <input type="password" id="oldPassword" v-model="formData.oldPassword" />
                </div>
                <div class="edit-item">
                    <label for="newPassword">修改密码:</label>
                    <input type="password" id="newPassword" v-model="formData.newPassword" />
                </div>
                <div class="edit-item">
                    <label for="confirmPassword">确认密码:</label>
                    <input type="password" id="confirmPassword" v-model="formData.confirmPassword" />
                </div>
                <button type="submit" class="userBtn">保存</button>
                <button type="button" @click="closeModal" class="userBtn">取消</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    },
    showModal: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['update:showModal', 'doUpdate'])

const formData = ref({
    avatar: null,
    username: props.userInfo.username,
    student_id: props.userInfo.student_id,
    email: props.userInfo.email,
    gender: props.userInfo.gender,
    introduction: props.userInfo.introduction,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const handleAvatarChange = (event) => {
    formData.value.avatar = event.target.files[0]
}

const submitForm = () => {
    if (formData.value.newPassword !== formData.value.confirmPassword) {
        alert('两次输入的密码不一致，请重新输入。')
        return
    }
    emit('doUpdate', formData.value)
    closeModal()
}

const closeModal = () => {
    emit('update:showModal', false)
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
}

.edit-item {
    margin-bottom: 10px;
}
</style>