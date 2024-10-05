import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import AuthProvider from './components/AuthProvider.vue';
import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(App);

app.component('AuthProvider', AuthProvider);

app.use(router);
app.mount('#app');