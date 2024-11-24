<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="container">
    <!-- 1. 侧边栏 -->
    <Sidebar />
    <!-- 2. 主视图 -->
    <main>
      <!-- 2.1 动态渲染与当前路由匹配的组件 -->
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  min-height: 100vh; /* 确保容器高度至少为视口高度 */
}

main {
  flex-grow: 1;
  margin-left: 175px;
  background-color: #f1f1f1;
  flex-direction: column;
  justify-content: center; /* 垂直居中对齐 */
  align-items: center; /* 水平居中对齐 */
  box-sizing: border-box; /* 确保padding不会导致高度超标 */
  position: relative;
  z-index: 0;
}

</style>
