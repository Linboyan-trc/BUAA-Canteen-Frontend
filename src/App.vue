<script setup>
import router from './router';
</script>

<template>
  <div class="app-container">
    <aside class = "sidebar">
      <img alt="buaa emoji" class="logo" src="./assets/emoji.png" width="50" height="50" />
      <!-- <router-link to="/">首页</router-link> -->
      <router-link to="/Home">浏览（首页）</router-link>
      <router-link to="/All">全部</router-link>
      <router-link to="/Admin">管理员</router-link>
      <router-link to="/login">登录</router-link> 
      <router-link to="/register">注册</router-link>
      <router-link to="/User" id="user-link">用户中心</router-link>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
}

.sidebar {
    position: fixed;
    left: 0;
    width: 200px;
    height: 100vh;
    overflow: auto;
    background-color: #04379d;
    padding: 4px;
}

main {
  margin-left: 200px; 
  /* 设置左边距，使其不被侧边栏遮挡 */
  flex-grow: 1; 
  /* 使主内容区域占据剩余空间 */
  /* padding: 20px;  */
  /* 添加内边距，使内容不紧贴边缘 */
}

a {
  display: block;
  width: 100%;
  color: white;
}

.logo {
  display: block;
  margin: 0 2rem;
}

#user-link {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

@media (hover: hover) {
  a:hover {
    background-color: rgb(77, 146, 249);
    width: 100%;
    /* border-style: outset; */
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
