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
import { register } from '@/api';

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
      const usernameRegex = /^[a-zA-Z0-9_]{5,15}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!usernameRegex.test(registerForm.username)) {
        alert("用户名必须是5到15个字符的字母、数字或下划线。");
        return;
      }

      if (!emailRegex.test(registerForm.email)) {
        alert("请输入有效的邮箱地址。");
        return;
      }

      if (registerForm.password.length < 6) {
        alert("密码必须至少6个字符。");
        return;
      }

      if (registerForm.password !== registerForm.confirmPassword) {
        alert("密码不匹配。");
        return;
      }

      console.log('正在注册', formData);
      const res = await register({
        usrname: registerForm.username, 
        email: registerForm.email, 
        password: registerForm.password});
      if (res.message) {
        alert("注册成功！");
        router.push({ name: 'login' }); // 注册成功后重定向到登录页面
      } else {
        console.error('注册失败:', res.error_msg);
        alert(`注册失败: ${res.error_msg}`);
      }
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