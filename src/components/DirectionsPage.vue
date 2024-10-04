<template>
    <div class="d-flex justify-content-center align-items-top bg-light text-dark" style="min-height: 100vh;">
      <div class="card p-4" style="max-width: 1200px; width: 100%; max-height: 900px;">
        <div class="text-center">
          <h2 class="mt-2">Список направлений</h2>
          <br />
  
          <p v-if="isLoading">Загрузка...</p>
          <p v-else-if="error">{{ error }}</p>
          <div v-else-if="directions.length > 0" class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID направления</th>
                  <th>Название направления</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="direction in directions"
                  :key="direction.direction_id"
                  @click="handleRowClick(direction.direction_id)"
                  style="cursor: pointer;"
                >
                  <td>{{ direction.direction_id }}</td>
                  <td>{{ direction.direction_caption }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else>Нет данных для отображения.</p>
  
          <button class="btn btn-dark mt-3" @click="handleBackToLKClick">Вернуться в ЛК</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { inject } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        directions: [],
        isLoading: true,
        error: null,
      };
    },
    setup() {
      const router = useRouter();
      const authContext = inject('authContext');
      return { router, authContext };
    },
    mounted() {
      this.fetchDirections();
    },
    methods: {
      fetchDirections() {
        const { userData } = this.authContext;
  
        if (!userData || !userData.token) {
          this.$router.push('/');
          return;
        }
  
        const abiturient_id = userData.abiturient_id;
        const token = userData.token;
  
        axios
          .post('http://localhost:8000/directions', { abiturient_id, token })
          .then((response) => {
            if (response.status === 200 && response.data.result) {
              this.directions = response.data.content.directions || [];
            } else {
              this.error = response.data.failure_message || 'Failed to load directions';
            }
            this.isLoading = false;
          })
          .catch((error) => {
            this.error = 'Error with API request';
            this.isLoading = false;
            console.error('Error with API request', error);
          });
      },
      handleRowClick(direction_id) {
        this.$router.push(`/direction/${direction_id}`);
      },
      handleBackToLKClick() {
        this.$router.push('/lk');
      },
    },
  };
  </script>
  
  <style scoped>
  </style>  