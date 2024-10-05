<template>
    <div class="container d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%;">
        <h2 class="text-center mb-4 text-light">Вход</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="form-label text-light">Почта</label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              :placeholder="errorMessages.email || 'Введите почту'"
              :class="['form-control', { 'is-invalid': errors.email }]"
              @input="handleChange"
              required
            />
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
          </div>
  
          <div class="mb-3">
            <label for="password" class="form-label text-light">Пароль</label>
            <input
              v-model="formData.password"
              type="password"
              id="password"
              :placeholder="errorMessages.password || 'Введите пароль'"
              :class="['form-control', { 'is-invalid': errors.password }]"
              @input="handleChange"
              required
            />
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
          </div>
  
          <button type="submit" class="btn btn-primary w-100">Войти</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useAuth } from '../context/AuthContext';
  
  export default {
    name: 'LoginForm',
    setup() {
      const router = useRouter();
      const auth = useAuth();
  
      const formData = reactive({
        email: '',
        password: '',
      });
  
      const errors = reactive({
        email: '',
        password: '',
      });
  
      const errorMessages = reactive({
        email: '',
        password: '',
      });
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const passwordInvalidMessage = 'Пароль должен содержать как минимум 8 символов, один заглавный символ и одну цифру.';
      const emailInvalidMessage = 'Введите корректный email';
  
      const handleChange = () => {
        if (!emailRegex.test(formData.email)) {
          errors.email = emailInvalidMessage;
        } else {
          errors.email = '';
        }
  
        if (!passwordRegex.test(formData.password)) {
          errors.password = passwordInvalidMessage;
        } else {
          errors.password = '';
        }
      };
  
      const handleSubmit = async () => {
        if (!errors.email && !errors.password) {
          try {
            const response = await axios.post('http://localhost:8000/login', {
              email: formData.email,
              password: formData.password,
            });
  
            if (response.status === 200 && response.data['result'] === true) {
              const { abiturient_id, token, is_admin } = response.data;
              const obj = { abiturient_id, token, is_admin };
              auth.logout();
              auth.login(obj);
              router.push('/lk');
            } else {
              errorMessages.email = 'Неверный email или пароль';
              errorMessages.password = 'Неверный email или пароль';
            }
          } catch (error) {
            errorMessages.email = 'Произошла ошибка';
            errorMessages.password = 'Произошла ошибка';
          }
        }
      };
  
      return {
        formData,
        errors,
        errorMessages,
        handleChange,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  .bg-dark {
    background-color: #343a40;
  }
  
  .card {
    background-color: #212529;
    border-radius: 10px;
    padding: 20px;
  }
  
  .text-light {
    color: #f8f9fa !important;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  