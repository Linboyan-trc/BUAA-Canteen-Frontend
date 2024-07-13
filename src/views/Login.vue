<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">用户名:</label>
                <input id="username" v-model="loginForm.username" type="text" required>
            </div>
            <div>
                <label for="password">密码:</label>
                <input id="password" v-model="loginForm.password" type="password" required>
            </div>
            <button type="submit">登录</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'; // 引入axios进行API调用

export default {
    name: 'LoginComponent',
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        async handleLogin() {
            try {
                // 调用登录方法
                await this.login(this.loginForm.username, this.loginForm.password);
                this.$router.push({ name: 'home' }); // 登录成功后重定向到首页
            } catch (error) {
                console.error('登录失败:', error);
                // 处理登录失败，例如显示错误消息
            }
        },
        async login(username, password) {
            // 在这里实现登录逻辑，例如通过调用后端API
            const response = await axios.post('/api/login', {
                username: username,
                password: password,
            });
            console.log(`登录用户 ${username}`);
            // 根据实际情况处理响应
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form>div {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>