<template>
    <div>
      <button @click="goToAdminLogin">Go to Admin Login</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "Admin",
    methods: {
      goToAdminLogin() {
        // 替换为你的Django管理页面的登录URL
        this.$router.push("http://127.0.0.1:8000/admin/login/");
      }
    }
  }
  </script>
  