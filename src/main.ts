import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router'; // 匯入我們剛剛建立的 router

const app = createApp(App);
const pinia = createPinia();

app.use(router); // 告訴 Vue 應用程式使用這個路由
app.use(pinia)
app.mount('#app');
