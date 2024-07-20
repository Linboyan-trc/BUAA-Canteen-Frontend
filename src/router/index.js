import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import All from '@/views/All.vue';
import Cafeteria from '@/views/Cafeteria.vue';
import Counter from '@/views/Counter.vue';
import Dish from '@/views/Dish.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import User from '@/views/User.vue';
import Admin from '@/views/Admin.vue'
import store from '@/store';
import { useUserStore } from '@/store/user';

const routes = [
  { 
    path: '/',
    component: Login 
  },
  { 
    path: '/admin', 
    component: Admin 
  },
  { 
    path: '/home', 
    component: Home 
  },
  { 
    path: '/cafeteria', 
    component: All 
  },
  { 
    path: '/all', 
    component: All 
  },
  { 
    path: '/cafeteria/:cafeteria', 
    component: Cafeteria 
  },
  { 
    path: '/cafeteria/:cafeteria/counter/:counterId', 
    component: Counter 
  },
  { 
    path: '/dish/:dishId', 
    component: Dish 
  },
  { 
    path: '/register', 
    component: Register 
  },
  { 
    path: '/login', 
    component: Login 
  },
  { 
    path: '/user/:userId', 
    component: User, 
    // meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.state.isAuthenticated; // 假设你在Vuex中存储了登录状态

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
