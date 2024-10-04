<template>
    <div class="d-flex justify-content-center align-items-top bg-dark text-dark" style="min-height: 100vh;">
      <div class="card p-4" style="max-width: 1200px; width: 100%; max-height: 900px;">
        <div class="text-center mb-4 bg-dark text-dark">
          <img
            :src="profilePictureUrl"
            class="rounded-circle"
            style="width: 150px; height: 150px; object-fit: cover"
            alt="User Profile"
          />
        </div>
  
        <div v-if="isAdmin" class="text-center">
          <h2 class="mt-2">Кабинет администратора {{ name }}</h2>
          <br />
          <button class="btn btn-dark" @click="navigateToAdminLK">Панель абитуриентов</button>
          <br /><br />
          <button class="btn btn-dark mt-3" @click="toggleDirectionForm">
            {{ showDirectionForm ? 'Скрыть форму' : 'Добавить новое направление' }}
          </button>
  
          <div v-if="showDirectionForm" class="mt-4">
            <p v-if="formError" class="text-danger">{{ formError }}</p>
            <form @submit.prevent="handleSubmitDirection">
              <div class="form-group">
                <label for="directionName">Название направления</label>
                <input
                  type="text"
                  id="directionName"
                  v-model="directionName"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label for="budgetPlaces">Количество бюджетных мест</label>
                <input
                  type="number"
                  id="budgetPlaces"
                  v-model="budgetPlaces"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label for="minBall">Минимальный балл</label>
                <input
                  type="number"
                  id="minBall"
                  v-model="minBall"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-dark mt-3">Добавить направление</button>
            </form>
          </div>
        </div>
  
        <div v-else class="bg-light text-dark">
          <h2 class="mt-2">Ваш личный кабинет, {{ name }}</h2>
          <br />
          <h4 class="mt-2" v-if="directionsLinks.length">Список ваших направлений:</h4>
          <p v-else class="text-center">Пока нет данных для отображения.</p>
  
          <div v-if="directionsLinks.length" class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Направление</th>
                  <th>Место</th>
                  <th>Оценка</th>
                  <th>Статус</th>
                  <th>Номер приоритета</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in directionsLinks" :key="index">
                  <td>{{ item.direction_caption }}</td>
                  <td>{{ item.place }}</td>
                  <td>{{ item.mark }}</td>
                  <td>{{ item.admission_status }}</td>
                  <td>{{ item.priority_number }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LK',
    data() {
      return {
        name: '',
        directionsLinks: [],
        profilePictureUrl: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
        isAdmin: false,
        showAdminLK: false,
        showDirectionForm: false,
        directionName: '',
        budgetPlaces: '',
        minBall: '',
        formError: '',
      };
    },
    mounted() {
      const userData = this.$root.userData;
  
      if (!userData || !userData.token) {
        this.$router.push('/');
        return;
      }
  
      const isAdmin = userData.is_admin || false;
      const abiturient_id = userData.abiturient_id;
      const token = userData.token;
  
      axios
        .post('http://localhost:8000/lk', { abiturient_id, token })
        .then((response) => {
          if (response.status === 200 && response.data.result === true) {
            const content = response.data.content;
            this.name = `${content.first_name} ${content.second_name}`;
            this.directionsLinks = content.directions_links || [];
            this.isAdmin = isAdmin;
          } else {
            this.$router.push('/');
          }
        })
        .catch((error) => {
          console.log('Error with API request', error);
        });
    },
    methods: {
      navigateToAdminLK() {
        this.$router.push('/adminLK');
      },
      toggleDirectionForm() {
        this.showDirectionForm = !this.showDirectionForm;
      },
      handleSubmitDirection() {
        const { directionName, budgetPlaces, minBall } = this;
        if (!directionName) {
          this.formError = 'Direction name is required';
          return;
        }
        if (!Number.isInteger(+budgetPlaces) || budgetPlaces < 4 || budgetPlaces > 20) {
          this.formError = 'Budget places must be a natural number between 4 and 20';
          return;
        }
        if (!Number.isInteger(+minBall) || minBall < 40 || minBall > 80) {
          this.formError = 'Min ball must be a natural number between 40 and 80';
          return;
        }
  
        const userData = this.$root.userData;
        const abiturient_id = userData.abiturient_id;
        const token = userData.token;
  
        const requestData = {
          direction_caption: directionName,
          budget_places_number: budgetPlaces,
          min_ball: minBall,
          abiturient_id,
          token,
        };
  
        axios
          .post('http://localhost:8000/directions/addNew', requestData)
          .then((response) => {
            if (response.status === 200 && response.data.result === true) {
              const directionId = response.data.direction_id;
              this.$router.push(`/direction/${directionId}`);
            } else {
              this.formError = response.data.failure_message || 'Failed to add new direction';
            }
          })
          .catch((error) => {
            console.log('Error with API request', error);
            this.formError = 'Error with API request';
          });
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  