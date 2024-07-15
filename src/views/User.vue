<template>
    <div class="user-center">
        <header class="user-header">
            <h1>用户个人中心</h1>
        </header>
        <div class="user-content">
            <aside class="user-sidebar">
                <nav>
                    <ul>
                        <li><router-link to="/user/profile">个人资料</router-link></li>
                        <li><router-link to="/user/ate">吃过的</router-link></li>
                        <li><router-link to="/user/collection">我的收藏</router-link></li>
                        <li><router-link to="/user/logout">退出登录</router-link></li>
                    </ul>
                </nav>
            </aside>
            <main class="user-main">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: 'User'
}
</script>

<style scoped>
.user-center {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.user-header {
    background-color: #4274b9;
    color: white;
    padding: 20px;
    text-align: center;
}

.user-content {
    display: flex;
    flex: 1;
}

.user-sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 20px;
}

.user-sidebar nav ul {
    list-style: none;
    padding: 0;
}

.user-sidebar nav ul li {
    margin-bottom: 10px;
}

.user-sidebar nav ul li a {
    text-decoration: none;
    color: #333;
    display: block;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.user-sidebar nav ul li a:hover {
    background-color: #ddd;
}

.user-main {
    flex: 1;
    padding: 20px;
}
</style>