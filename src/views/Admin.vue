<template>
  <div class="button-container">
    <button class="custom-button" @click="goToAdminLogin">Go to Admin Login</button>
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

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
}

.custom-button {
  background-color: #4274b9;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.custom-button:hover {
  background-color: #004085;
  transform: translateY(-2px);
}

.custom-button:active {
  background-color: #004085;
  transform: translateY(0);
}
</style>
