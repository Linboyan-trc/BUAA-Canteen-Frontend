import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import All from '@/views/All.vue';
import Cafeteria from '@/views/Cafeteria.vue';
import Counter from '@/views/Counter.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import User from '@/views/User.vue';
import Admin from '@/views/Admin.vue'
import store from '@/store';
import { useUserStore } from '@/store/user';
import Detail from '@/views/Detail.vue';

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
    path: '/cafeteria/:cafeteriaId', 
    component: Cafeteria 
  },
  { 
    path: '/cafeteria/:cafeteriaId/counter/:counterId', 
    component: Counter 
  },
  { 
    path: '/dish/:dishId', 
    component: Detail 
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
  const isAuthenticated = store.state.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
