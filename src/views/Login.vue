<template>
    <div class="login-container">
        <h1>请先登录</h1>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="email">邮箱:</label>
                <input id="email" v-model="loginForm.email" type="text" required>
            </div>
            <div>
                <label for="password">密码:</label>
                <input id="password" v-model="loginForm.password" type="password" required>
            </div>
            <button type="submit">登录</button>
        </form>
        <p>
            还没有账号？
            <router-link to="/register">立即注册</router-link>
        </p>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { login } from '@/api';
import { useStore } from 'vuex';

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginForm = reactive({
      email: '',
      password: '',
    });

    const handleLogin = async () => {
      try {
        // 调用登录方法
        const response = await login({email: email, password: password,});
        console.log(`登录用户 ${email}`);
        store.dispatch('login');
        router.push({ name: 'home' }); // 登录成功后重定向到首页
      } catch (error) {
        console.error('登录失败:', error);
        // 处理登录失败，例如显示错误消息
      }
    };
    
    return {
      loginForm,
      handleLogin,
    };
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