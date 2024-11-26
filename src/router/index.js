import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import All from '@/views/All.vue';
import Cafeteria from '@/views/Cafeteria.vue';
import Counter from '@/views/Counter.vue';
import Detail from '@/views/Detail.vue';
import AllPosts from '@/views/AllPosts.vue'
import Upload from '@/views/Upload.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import User from '@/views/User.vue';
import store from '@/store';

const routes = [
  // 1. 首页
  {
    path: '/',
    name: 'ORIGIN',
    component: Home
  },
  // 2. 所有
  // 2.1 所有食堂
  // 2.2 某个食堂所有窗口
  // 2.3 某个窗口所有菜品
  // 2.4 单个菜品
  {
    path: '/all',
    name: 'All',
    component: All
  },
  {
    path: '/cafeteria/:cafeteriaId',
    name: 'Cafeteria',
    component: Cafeteria,
    props: true
  },
  {
    path: '/cafeteria/:cafeteriaId/counter/:counterId',
    name: 'CafeteriaCounter',
    component: Counter,
    props: true
  },
  {
    path: '/dish/:dishId',
    name: 'DishDetail',
    component: Detail,
    props: true
  },
  // 3. 帖子
  {
    path: '/posts',
    name: 'AllPosts',
    component: AllPosts,
  },
  // 4. 发布
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  // 5. 登录
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // 6. 我的
  {
    path: '/user/:userId',
    name: 'User',
    component: User,
    // meta: { requiresAuth: true }
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.state.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
