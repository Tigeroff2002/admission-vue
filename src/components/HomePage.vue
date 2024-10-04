<template>
  <div class="d-flex justify-content-center align-items-center bg-dark text-dark" style="min-height: 100vh;">
    <div class="card p-4" style="max-width: 600px; width: 100%;">
      <h2 class="text-center mb-4">Вы не авторизованы, вам не доступен личный кабинет</h2>
      <nav>
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-transparent">
            <router-link to="/register" class="text-decoration-none" :style="{ color: 'var(--link-color)' }">
              Страница регистрации
            </router-link>
          </li>
          
          <!-- Login Page Link -->
          <li class="list-group-item bg-transparent">
            <router-link to="/login" class="text-decoration-none" :style="{ color: 'var(--link-color)' }">
              Страница авторизации
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
</style>
