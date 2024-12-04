import './styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import modules from '@/store/index.js'

const app = createApp(App)

app.use(router)

app.use(modules).mount('#app')
