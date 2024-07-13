import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Cafeteria from '@/views/Cafeteria.vue';
import Counter from '@/views/Counter.vue';
import Dish from '@/views/Dish.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/cafeteria/:cafeteria', component: Cafeteria },
  { path: '/cafeteria/:cafeteria/counter/:counterId', component: Counter },
  { path: '/dish/:dishId', component: Dish },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
