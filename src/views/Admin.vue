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
        window.location.href = "http://localhost:8000/admin/login/";
      }
    }
  }
  </script>
  
