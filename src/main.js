import './assets/css/main.css'

import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia';

axios.defaults.baseURL = import.meta.env.VUE_APP_API_BASE_URL || 'http://localhost:8000/api';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
const pinia = createPinia()
app.use(pinia) 
app.mount('#app')
