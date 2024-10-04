<template>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Домашняя страница</router-link>
        <div class="d-flex">
          <template v-if="isAuthenticated">
            <button class="btn btn-outline-light" @click="logout">Выйти</button>
            <button class="btn btn-outline-light" @click="goToAllDirections">Все направления</button>
            <button class="btn btn-outline-light" @click="goToLK">Ваш ЛК</button>
          </template>
          <template v-else>
            <router-link class="btn btn-outline-light" to="/login">Страница авторизации</router-link>
            <router-link class="btn btn-outline-light" to="/register">Страница регистрации</router-link>
          </template>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { useAuth } from '../context/AuthContext';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Navbar',
    setup() {
      const auth = useAuth();
      const router = useRouter();
      const isAuthenticated = !!auth.state.userData.token;
  
      const logout = () => {
        auth.logout();
        router.push('/');
      };
  
      const goToAllDirections = () => {
        router.push('/directions');
      };
  
      const goToLK = () => {
        router.push('/lk');
      };
  
      return {
        isAuthenticated,
        logout,
        goToAllDirections,
        goToLK
      };
    }
  }
  </script>
  