<template>
    <div class="d-flex justify-content-center align-items-top bg-light text-dark" style="min-height: 100vh;">
      <div class="card p-4" style="max-width: 1200px; width: 100%; max-height: 900px;">
        <div class="text-center">
          <h2 class="mt-2">Направление {{ directionCaption }}</h2>
          <br />
          <h3 class="mt-2">Настройки:</h3>
          <h5 class="mt-2">Бюджетных мест {{ directionPlacesNumber }}</h5>
          <h5 class="mt-2">Проходной балл {{ directionMinBall }}</h5>
          <br />
  
          <div class="d-flex justify-content-end mb-3">
            <button class="btn btn-primary" @click="toggleModal">Управление баллами</button>
          </div>
  
          <h3 class="mt-2">Список мест направления</h3>
          <br />
  
          <p v-if="isLoading">Загрузка...</p>
          <p v-else-if="error">{{ error }}</p>
          <div v-else-if="places.length > 0" class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Место</th>
                  <th>Id абитуриента</th>
                  <th>Абитуриент</th>
                  <th>Оценка</th>
                  <th>Статус зачисления</th>
                  <th>Приоритет</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="place in places" :key="place.place">
                  <td>{{ place.place }}</td>
                  <td>{{ place.abiturient_id }}</td>
                  <td>{{ place.abiturient_name }}</td>
                  <td>{{ place.mark }}</td>
                  <td>{{ place.admission_status }}</td>
                  <td>{{ place.prioritet_number }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else>Нет данных для отображения.</p>
  
          <button class="btn btn-dark mt-3" @click="handleBackToLKClick">Вернуться в ЛК</button>
  
          <modal v-if="showModal" @close="toggleModal">
            <template #header>
              <h5 class="modal-title">Управление баллами</h5>
            </template>
  
            <template #body>
              <form>
                <div class="form-group">
                  <button type="button" class="btn btn-secondary" @click="handleDownloadEmptyCSV">Скачать шаблон (пустой файл)</button>
                </div>
  
                <div class="form-group mt-3">
                  <label for="uploadCSV">Загрузить файл с баллами (CSV)</label>
                  <input type="file" accept=".csv" class="form-control" @change="handleFileUpload" />
                </div>
              </form>
            </template>
  
            <template #footer>
              <button type="button" class="btn btn-primary" @click="toggleModal">Сохранить и закрыть</button>
            </template>
          </modal>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { inject, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';

  export default {
    setup() {
      const authContext = inject('authContext');
      const router = useRouter();
      const route = useRoute();
      const directionCaption = ref(null);
      const directionPlacesNumber = ref(0);
      const directionMinBall = ref(0);
      const places = ref([]);
      const isLoading = ref(true);
      const error = ref(null);
      const showModal = ref(false);
  
      onMounted(() => {
        fetchDirectionData();
      });
  
      const fetchDirectionData = async () => {
        const { userData } = authContext;
  
        if (!userData || !userData.token) {
          router.push('/');
          return;
        }
  
        const abiturient_id = userData.abiturient_id;
        const token = userData.token;
        const direction_id = route.params.id;
  
        const request_data = { abiturient_id, token, direction_id };
  
        try {
          const response = await axios.post('http://localhost:8000/direction', request_data);
          if (response.status === 200 && response.data.result) {
            directionCaption.value = response.data.content.direction_caption;
            directionPlacesNumber.value = response.data.content.budget_places_number;
            directionMinBall.value = response.data.content.min_ball;
            places.value = response.data.content.places || [];
          } else {
            error.value = response.data.failure_message || 'Failed to load places';
          }
        } catch (err) {
          error.value = 'Error with API request';
          console.error('Error with API request', err);
        } finally {
          isLoading.value = false;
        }
      };
  
      const toggleModal = () => {
        showModal.value = !showModal.value;
      };
  
      const handleDownloadEmptyCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,abiturient_id,abiturient_name,mark\n";
  
        places.value.forEach((place) => {
          const { abiturient_id, abiturient_name, mark } = place;
          csvContent += `${abiturient_id},${abiturient_name},${mark}\n`;
        });
  
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `empty_marks_${directionCaption.value.toLowerCase()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
  
      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          console.log("File selected:", file.name);
        }
      };
  
      const handleBackToLKClick = () => {
        router.push('/lk');
      };
  
      return {
        directionCaption,
        directionPlacesNumber,
        directionMinBall,
        places,
        isLoading,
        error,
        showModal,
        toggleModal,
        handleDownloadEmptyCSV,
        handleFileUpload,
        handleBackToLKClick,
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
