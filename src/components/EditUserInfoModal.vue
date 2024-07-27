<template>
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h3 class="modal-title">编辑用户信息</h3>
            <form @submit.prevent="submitForm">
                <div class="edit-item">
                    <label for="avatar" class="form-label">头像:</label>
                    <input type="file" id="avatar" @change="handleAvatarChange" class="form-input" />
                </div>
                <div class="edit-item">
                    <label for="username" class="form-label">用户名:</label>
                    <input type="text" id="username" v-model="formData.username" class="form-input"/>
                </div>
                <div class="edit-item">
                    <label for="student_id" class="form-label">学号:</label>
                    <input type="text" id="student_id" v-model="formData.student_id" class="form-input" />
                </div>
                <div class="edit-item">
                    <label for="email" class="form-label">邮箱:</label>
                    <input type="email" id="email" v-model="formData.email" class="form-input" />
                </div>
                <div class="edit-item">
                    <label for="gender" class="form-label">性别:</label>
                    <select id="gender" v-model="formData.gender" class="form-select">
                        <option value="" disabled selected>请选择性别</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                        <option value="">不展示性别</option>
                    </select>
                </div>
                <div class="edit-item">
                    <label for="introduction" class="form-label">个人介绍:</label>
                    <input type="text" id="introduction" v-model="formData.introduction" class="form-input" />
                </div>
                <div class="edit-item">
                    <label for="oldPassword" class="form-label">旧密码:</label>
                    <input type="password" id="oldPassword" v-model="formData.oldPassword" class="form-input" />
                </div>
                <div class="edit-item">
                    <label for="newPassword" class="form-label">修改密码:</label>
                    <input type="password" id="newPassword" v-model="formData.newPassword" class="form-input" />
                </div>
                <div class="edit-item">
                    <label for="confirmPassword" class="form-label">确认密码:</label>
                    <input type="password" id="confirmPassword" v-model="formData.confirmPassword" class="form-input" />
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn btn-primary">保存</button>
                    <button type="button" @click="closeModal" class="btn btn-secondary">取消</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { updateUserInfo, updateUserAvatar, updateUserPassword } from '@/api/user.js'
import { useUserStore } from '@/store/user.js'

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

const submitForm = async () => {
    // 验证密码一致性
    if (formData.value.newPassword !== formData.value.confirmPassword) {
        alert('两次输入的密码不一致，请重新输入。')
        return
    }

    try {
        // 更新用户信息（文本）
        const userInfoResponse = await updateUserInfo({
            username: formData.value.username,
            email: formData.value.email,
            gender: formData.value.gender,
            introduction: formData.value.introduction,
            student_id: formData.value.student_id
        });
        console.log(userInfoResponse);

        if (!userInfoResponse.success) {
            alert(`更新用户信息失败，请稍后重试。${userInfoResponse.status}`)
            return
        }

        // 更新用户头像
        if (formData.value.avatar) {
            const formDataAvatar = new FormData();
            formDataAvatar.append('avatar', formData.value.avatar);
            const avatarResponse = await updateUserAvatar(formDataAvatar);
             console.log(avatarResponse);

            if (!avatarResponse.success) {
                alert('更新头像失败，请稍后重试。')
                return
            }
        }

        // 更新用户密码（如果提供了新密码）
        if (formData.value.newPassword) {
            const passwordResponse = await updateUserPassword({
                oldPassword: formData.value.oldPassword,
                newPassword: formData.value.newPassword
            });

            if (!passwordResponse.success) {
                alert('更新密码失败，请稍后重试。')
                return
            }
        }

        // 提交成功，关闭模态框
        alert('用户信息更新成功！');
        emit('doUpdate', formData.value);
        closeModal();
        
    } catch (error) {
        console.error('更新失败:', error);
        alert('更新失败，请稍后重试。')
    }
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
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #ffffff;
    padding: 20px;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

.edit-item {
    margin-bottom: 15px;
}

.form-label {
    display: block;
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
}

.form-input,
.form-select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-sizing: border-box;
}

.form-input:focus,
.form-select:focus {
    border-color: #007bff;
    outline: none;
}

.form-select {
    background: #fff;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-secondary {
    background-color: #6c757d;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-secondary:hover {
    background-color: #5a6268;
}
</style>
