<template>
  <div class="container">
    <div class="card">
      <h2 class="text-center mb-4">Вы не авторизованы, вам не доступен личный кабинет</h2>
      <nav>
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-transparent">
            <router-link to="/register" class="text-decoration-none link">
              Страница регистрации
            </router-link>
          </li>
          <li class="list-group-item bg-transparent">
            <router-link to="/login" class="text-decoration-none link">
              Страница авторизации
            </router-link>
          </li>
          <li class="list-group-item bg-transparent">
            <router-link to="/lk" class="text-decoration-none link">
              Страница личного кабинета
            </router-link>
          </li>
          <li class="list-group-item bg-transparent">
            <router-link to="/directions" class="text-decoration-none link">
              Страница направлений
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1c1c1c, #444);
  padding: 20px;
}

.card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  width: 100%;
  max-width: 600px;
}

.card:hover {
  transform: translateY(-5px);
}

h2 {
  color: #333;
  font-weight: 600;
}

.list-group-item {
  border: none; /* Remove border from list items */
}

.link {
  color: #007bff; /* Link color */
  font-weight: 500;
  text-align: center; /* Center align text */
  display: block; /* Make the link block level */
  padding: 10px 0; /* Padding for clickable area */
  transition: color 0.2s;
}

.link:hover {
  color: #0056b3; /* Darker shade on hover */
}
</style>
