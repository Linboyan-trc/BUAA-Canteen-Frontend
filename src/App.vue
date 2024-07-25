<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div>
    <Sidebar></Sidebar>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

main {
  flex-grow: 1;
  margin-left: 175px;
  background-color: #f1f1f1;
  flex-direction: column;
  justify-content: center; /* 垂直居中对齐 */
  align-items: center; /* 水平居中对齐 */
  box-sizing: border-box; /* 确保padding不会导致高度超标 */
}
</style>
