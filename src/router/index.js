import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import LoginForm from '../components/LoginForm.vue';
import RegistrationForm from '../components/RegistrationForm.vue';
import LK from '../components/LK.vue';
import AdminLK from '../components/AdminLK.vue';
import DirectionsPage from '../components/DirectionsPage.vue';
import DirectionPage from '../components/DirectionPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegistrationForm },
  { path: '/lk', component: LK },
  { path: '/adminLK', component: AdminLK },
  { path: '/directions', component: DirectionsPage },
  { path: '/direction/:id', component: DirectionPage }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
