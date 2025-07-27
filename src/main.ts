import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // 匯入我們剛剛建立的 router

const app = createApp(App);

app.use(router); // 告訴 Vue 應用程式使用這個路由

app.mount('#app');
