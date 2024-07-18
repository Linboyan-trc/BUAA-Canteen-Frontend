<template>
  <div class="register-container">
    <h1>请先注册</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">用户名:</label>
        <input id="username" v-model="registerForm.username" type="text" required>
      </div>
      <div>
        <label for="email">邮箱:</label>
        <input id="email" v-model="registerForm.email" type="email" required>
      </div>
      <div>
        <label for="password">密码:</label>
        <input id="password" v-model="registerForm.password" type="password" required>
      </div>
      <div>
        <label for="confirmPassword">确认密码:</label>
        <input id="confirmPassword" v-model="registerForm.confirmPassword" type="password" required>
      </div>
      <button type="submit">注册</button>
    </form>
    <p>
      已有账号？
      <router-link to="/login">立即登录</router-link>
    </p>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // 确保已经安装并导入axios

export default {
  name: 'Register',
  setup() {
    const router = useRouter();
    const registerForm = reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const handleRegister = async() => {
      if (registerForm.password !== registerForm.confirmPassword) {
        alert("密码不匹配。");
        return;
      }
      try {
        await register(registerForm);
        alert("注册成功！");
        router.push({ name: 'login' });// 注册成功后重定向到登录页面
      } catch (error) {
        console.error('注册失败:', error);
        // 处理注册失败，例如显示错误消息
      }
    };

    const register = async (formData) => {
      // 在这里通常会向后端API发送注册用户的请求
      // 例如使用axios向Django后端发送请求:
      await axios.post('/api/register', formData);
      console.log('正在注册', formData);
      // 已替换为实际的实现
    };

    return {
      registerForm,
      handleRegister,
    };
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form > div {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>