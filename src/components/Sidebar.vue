<template>
  <div class="app-container">
    <aside class = "sidebar">
      <img alt="buaa emoji" class="logo" src="../assets/emoji.png" width="50" height="50" />
      <ul>
        <li><router-link to="/home">浏览（首页）</router-link></li>
        <li><router-link to="/all">所有食堂</router-link></li>
        <li><router-link to="/admin">管理员</router-link></li>
        <li><router-link to="/login" v-if="!userId">登录</router-link></li> 
        <li><router-link to="/register" v-if="!userId">注册</router-link></li>
        <li><router-link to="/upload">发布</router-link></li>
        <li id="user-item" v-if="userId"><router-link :to="`/user/${userId}`">我的</router-link></li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { useUserStore } from '@/store/user';
import { ref, computed } from 'vue';

export default {
    name: 'Sidebar',
    setup() {
        const userStore = useUserStore();
        const userId = computed(() => userStore.userInfo.id);
        // console.log('userInfo:', userStore.userInfo);
        // console.log('userId:', userId.value);
        return {
            userId
        }
    }
}
</script>
<style scoped>
header {
	margin:0;
	padding:0;
	border:0
}

.app-container {
  position: relative;
}

.sidebar {
    position: fixed;
    left: 0;
    width: 200px;
    min-height: 100vh;
    /* overflow: auto; */
    background-color: #04379d;
    padding-left: 2px;
}

ul {
  margin: 0;
  padding: 0;
}

main {
  margin-left: 200px; 
  /* 设置左边距，使其不被侧边栏遮挡 */
  flex-grow: 1; 
  /* 使主内容区域占据剩余空间 */
  /* padding: 20px; */
  /* 添加内边距，使内容不紧贴边缘 */
}

a {
  display: block;
  /* width: 100%; */
  color: white;
}

.logo {
  display: block;
  margin: 0 2rem 0 0;
}

#user-item {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

@media (hover: hover) {
  a:hover {
    background-color: rgb(77, 146, 249);
  }
}

@media (max-width: 1024px) {
  .sidebar {
    width: 120px;
  }

  main {
  margin-left: 120px; 
  /* 设置左边距，使其不被侧边栏遮挡 */
  flex-grow: 1; 
  /* 使主内容区域占据剩余空间 */
  }
}
</style>