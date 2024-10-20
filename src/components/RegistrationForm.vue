<template>
    <div class="registration-container">
      <div class="card p-4">
        <h2 class="text-center mb-4">Регистрация</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="firstName" class="form-label">Ваше имя</label>
            <input
              v-model="formData.firstName"
              type="text"
              id="firstName"
              :placeholder="errors.firstName || 'Введите ваше имя'"
              :class="['form-control', { 'is-invalid': errors.firstName }]"
              @input="handleChange"
              required
            />
            <div v-if="errors.firstName" class="invalid-feedback">{{ errors.firstName }}</div>
          </div>
  
          <div class="mb-3">
            <label for="secondName" class="form-label">Ваша фамилия</label>
            <input
              v-model="formData.secondName"
              type="text"
              id="secondName"
              :placeholder="errors.secondName || 'Введите вашу фамилию'"
              :class="['form-control', { 'is-invalid': errors.secondName }]"
              @input="handleChange"
              required
            />
            <div v-if="errors.secondName" class="invalid-feedback">{{ errors.secondName }}</div>
          </div>
  
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              :placeholder="errors.email || 'Введите вашу почту'"
              :class="['form-control', { 'is-invalid': errors.email }]"
              @input="handleChange"
              required
            />
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
          </div>
  
          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input
              v-model="formData.password"
              type="password"
              id="password"
              :placeholder="errors.password || 'Введите новый пароль'"
              :class="['form-control', { 'is-invalid': errors.password }]"
              @input="handleChange"
              required
            />
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
          </div>
  
          <div class="mb-3 form-check">
            <input
              v-model="formData.is_admin"
              type="checkbox"
              id="isAdmin"
              class="form-check-input"
            />
            <label for="isAdmin" class="form-check-label">Вы админ?</label>
          </div>
  
          <button type="submit" class="btn btn-primary w-100">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
/*   import axios from 'axios'; */
/*   import { useAuth } from '../context/AuthContext'; */
  
  export default {
    name: 'RegistrationForm',
    setup() {
      const router = useRouter();
/*       const auth = useAuth(); */
  
      const formData = reactive({
        firstName: '',
        secondName: '',
        email: '',
        password: '',
        is_admin: false,
      });
  
      const errors = reactive({
        firstName: '',
        secondName: '',
        email: '',
        password: '',
      });
  
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const passwordInvalidMessage = 'Пароль должен содержать как минимум 8 символов, один заглавный символ и одну цифру.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailInvalidMessage = 'Введите корректный email';
      const requiredFieldMessage = 'Это поле не может быть пустым';
  
      const handleChange = () => {
        if (!passwordRegex.test(formData.password)) {
          errors.password = passwordInvalidMessage;
        } else {
          errors.password = '';
        }
  
        if (!emailRegex.test(formData.email)) {
          errors.email = emailInvalidMessage;
        } else {
          errors.email = '';
        }
  
        errors.firstName = formData.firstName.trim() === '' ? requiredFieldMessage : '';
        errors.secondName = formData.secondName.trim() === '' ? requiredFieldMessage : '';
      };
  
      const handleSubmit = async () => {
        handleChange();
  
        router.push('/lk');

/*         if (!errors.firstName && !errors.secondName && !errors.email && !errors.password) {
          try {
            const response = await axios.post('http://localhost:8000/register', {
              email: formData.email,
              password: formData.password,
              first_name: formData.firstName,
              second_name: formData.secondName,
              is_admin: formData.is_admin,
            });
  
            if (response.status === 200 && response.data['result'] === true) {
              const { abiturient_id, token, is_admin } = response.data;
              auth.login({ abiturient_id, token, is_admin });
              router.push('/lk');
            } else {
              errors.email = 'Invalid email or password';
              errors.password = 'Invalid email or password';
            }
          } catch (error) {
            errors.email = 'An error occurred';
            errors.password = 'An error occurred';
          }
        } else {
          alert('Пожалуйста, исправьте ошибки в форме.');
        } */
      };
  
      return {
        formData,
        errors,
        handleChange,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  .registration-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #343a40; /* Dark background */
  }
  
  .card {
    background-color: #ffffff; /* White background for the card */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  .form-label {
    font-weight: bold;
  }
  
  .invalid-feedback {
    color: red;
  }
  
  .btn-primary {
    background-color: #007bff; /* Bootstrap primary color */
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3; /* Darker on hover */
    border-color: #0056b3;
  }
  </style>
  