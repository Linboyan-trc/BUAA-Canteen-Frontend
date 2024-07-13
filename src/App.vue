<script setup>

</script>

<template>
  <header>
    <img alt="buaa emoji" class="logo" src="./assets/emoji.png" width="50" height="50" />
    <nav>
      <router-link to="/">首页</router-link> 
      <router-link to="/cafeteria/student1">学一食堂</router-link> 
      <router-link to="/cafeteria/student2">学二食堂</router-link> 
      <router-link to="/cafeteria/student3">学三食堂</router-link> 
      <router-link to="/cafeteria/student4">学四食堂</router-link> 
      <router-link to="/cafeteria/student5">学五食堂</router-link> 
      <router-link to="/cafeteria/student6">学六食堂</router-link> 
      <router-link to="/cafeteria/teacher">教工食堂</router-link> 
      <router-link to="/cafeteria/halal">清真食堂</router-link> 
      <router-link to="/cafeteria/heyi">合一厅食堂</router-link> 
      <router-link to="/login">登录</router-link> 
      <router-link to="/register">注册</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  background-color: darkorange;
}

nav {
  font-size: 1.2rem;
  gap: 5px;
}

a {
  color: white;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (hover: hover) {
  a:hover {
    background-color: rgb(249, 218, 77);
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
