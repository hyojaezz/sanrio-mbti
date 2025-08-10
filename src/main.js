// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/main.css' // ✅ CSS 경로 수정

const app = createApp(App)
app.use(router)
app.mount('#app')