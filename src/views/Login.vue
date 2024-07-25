<template>
    <div class="login">
        <div class="login-container">
            <h1>请先登录</h1>
            <form @submit.prevent="handleLogin">
                <div>
                    <label for="email">邮箱:</label>
                    <input id="email" v-model="loginForm.email" type="text" placeholder="请输入邮箱" required>
                </div>
                <div>
                    <label for="password">密码:</label>
                    <input id="password" v-model="loginForm.password" type="password" placeholder="请输入密码" required>
                </div>
                <button type="submit" class="btn">登录</button>
            </form>
            <hr>
            <p>
                还没有账号？
                <router-link to="/register" class="reg">立即注册</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';


export default {
  name: 'Login',
  setup() {
    const store = useUserStore();
    const router = useRouter();
    const loginForm = reactive({
      email: '',
      password: '',
    });

    const handleLogin = async () => {
        // 调用登录方法
        const email = await store.userLogin(loginForm.email, loginForm.password);
        if (!email) {
          alert('登录失败，请检查邮箱和密码是否正确');
          return;
        }
        console.log(`登录用户 ${email}`);
        await router.push({ name: 'home' }); // 登录成功后重定向到首页
    };
    
    return {
      loginForm,
      handleLogin,
    };
  },
};

</script>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-content: center;
    height:800px;
}
.login-container {
    width: 400px;
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
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.btn {
  background-color: #1574b8; /* Transparent background */
  color: white; /* White font color */
  border: none; /* Remove border */
  padding: 10px 20px; /* Add some padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Inline block display */
  font-size: 18px; /* Increase font size */
  margin: 4px 2px; /* Add some margin */
  cursor: pointer; /* Pointer cursor on hover */
  border-radius: 4px; /* Rounded corners */
  transition: color 0.3s; /* Smooth font color transition */
}

.btn:active {
  background-color: #125188; 
  color: #d3d3d3; /* Light grey font color on hover */
}

label {
    font-size: 18px;
}

p {
    font-size: 18px;
}

.reg {
    background-color: #1574b8;
    color: white; /* White font color */
    border: none; /* Remove border */
    padding: 10px 20px; /* Add some padding */
    text-align: center; /* Center text */
    text-decoration: none; /* Remove underline */
    display: inline-block; /* Inline block display */
    font-size: 18px; /* Increase font size */
    margin: 4px 2px; /* Add some margin */
    cursor: pointer; /* Pointer cursor on hover */
    border-radius: 4px; /* Rounded corners */
    transition: color 0.3s;
}
.reg:active {
  background-color: #125188; 
  color: #d3d3d3; /* Light grey font color on hover */
}
</style>