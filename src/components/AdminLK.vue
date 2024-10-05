<template>
    <div class="d-flex justify-content-center align-items-top bg-dark text-dark" style="min-height: 100vh;">
      <div class="card p-4" style="max-width: 1200px; width: 100%; max-height: 1200px;">
        <div class="text-center mb-4 bg-dark text-dark">
          <img
            :src="profilePictureUrl"
            class="rounded-circle"
            style="width: 150px; height: 150px; object-fit: cover;"
            alt="User Profile"
          />
        </div>
  
        <div v-if="!isAdmin" class="text-center"></div>
        <div v-else-if="abiturients.length > 0" class="text-center">
          <h3 class="mt-2">Список абитуриентов</h3>
          <br />
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Имя абитуриента</th>
                <th>Подавал доки?</th>
                <th>Уже зачислен?</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="abiturient in abiturients"
                :key="abiturient.abiturient_id"
                @click="handleRowClick(abiturient)"
              >
                <td>{{ abiturient.abiturient_name }}</td>
                <td>{{ abiturient.is_requested ? 'Да' : 'Нет' }}</td>
                <td>{{ abiturient.is_enrolled ? 'Да' : 'Нет' }}</td>
              </tr>
  
              <tr v-if="selectedAbiturientId === abiturient.abiturient_id">
                <td colspan="3">
                  <form @submit.prevent="handleSubmit">
                    <div class="mb-2">
                      <input
                        type="checkbox"
                        id="hasDiplomOriginal"
                        v-model="hasDiplomOriginal"
                      />
                      <label for="hasDiplomOriginal">Есть оригинал диплома?</label>
                    </div>
  
                    <div v-for="(direction, index) in directions" :key="index" class="mb-2">
                      <div class="mb-1">
                        <label class="mb-1">
                          {{
                            directionsInformations.find(
                              (info) => info.direction_id === direction.directionId
                            )?.direction_caption || `Направление ${index + 1}: Нет данных`
                          }}
                        </label>
                        <input
                          type="text"
                          v-model="direction.directionId"
                          placeholder="ID направления"
                          class="form-control mb-1"
                        />
                        <label class="mb-1">Номер приоритета: {{ index + 1 }}</label>
                      </div>
                    </div>
  
                    <button type="submit" class="btn btn-dark mt-2">Сохранить</button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-dark" @click="handleRedirect">Вернуться в ЛК</button>
        </div>
  
        <p v-else class="text-center">Пока нет данных для отображения.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useAuth } from '../context/AuthContext';
  
  export default {
    data() {
      return {
        profilePictureUrl:
          'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
        abiturients: [],
        directionsInformations: [],
        selectedAbiturientId: null,
        hasDiplomOriginal: false,
        directions: Array(3).fill({ directionId: '', prioritetNumber: '' }),
        isAdmin: false,
      };
    },
    setup() {
      const router = useRouter();
      const authContext = useAuth();

      if (!authContext) {
        throw new Error('authContext not found');
    }

      return { router, authContext };
    },
    mounted() {
      this.fetchAbiturients();
    },
    methods: {
      fetchAbiturients() {
        const { userData } = this.authContext;
  
        if (!userData || !userData.token) {
          this.router.push('/');
          return;
        }
  
        const abiturient_id = userData.abiturient_id;
        const token = userData.token;
        const isAdmin = userData.is_admin || false;
  
        axios
          .post('http://localhost:8000/abiturients/all', { abiturient_id, token })
          .then((response) => {
            if (response.status === 200 && response.data.result) {
              const content = response.data.content;
              this.abiturients = content.abiturients || [];
              this.isAdmin = isAdmin;
            } else {
              this.router.push('/lk');
            }
          })
          .catch((error) => {
            console.error('Error with API request', error);
          });
  
        axios
          .post('http://localhost:8000/directions', { abiturient_id, token })
          .then((response) => {
            if (response.status === 200 && response.data.result) {
              this.directionsInformations = response.data.content.directions || [];
            }
          })
          .catch((error) => {
            console.error('Error with API request', error);
          });
      },
      handleRowClick(abiturient) {
        this.selectedAbiturientId =
          this.selectedAbiturientId === abiturient.abiturient_id
            ? null
            : abiturient.abiturient_id;
        this.hasDiplomOriginal = false;
        this.directions = Array(3).fill({ directionId: '', prioritetNumber: '' });
      },
      handleSubmit() {
        const { selectedAbiturientId, hasDiplomOriginal, directions } = this;
        const { userData } = this.authContext;
  
        let index = 1;
  
        const requestData = {
          abiturient_id: userData.abiturient_id,
          token: userData.token,
          content: {
            target_abiturient_id: selectedAbiturientId,
            has_diplom_original: hasDiplomOriginal,
            directions_links: directions.map((dir) => ({
              direction_id: dir.directionId,
              prioritet_number: index++,
              mark: 0,
            })),
          },
        };
  
        axios
          .post('http://localhost:8000/abiturients/addInfo', requestData)
          .then((response) => {
            if (response.status === 200 && response.data.result) {
              this.fetchAbiturients();
            } else {
              console.error('Failed to add information');
            }
          })
          .catch((error) => {
            console.error('Error submitting data', error);
          });
      },
      handleRedirect() {
        this.$router.push('/lk');
      },
    },
  };
  </script>
  
  <style scoped>
  </style>  