<template>
    <slot></slot>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { useAuthProvider } from '../context/AuthContext';
  
  export default defineComponent({
    name: 'AuthProvider',
    setup() {
      useAuthProvider();
    },
  });
  </script>