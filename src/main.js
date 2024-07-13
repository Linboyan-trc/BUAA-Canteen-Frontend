import './assets/main.css'

import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
