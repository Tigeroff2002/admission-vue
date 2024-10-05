<template>
  <AuthProvider>
    <router-view/>
  </AuthProvider>
</template>

<script>
import { useAuthProvider } from './context/AuthContext';
import { useRouter } from 'vue-router';
import { useAuth } from './context/AuthContext';
export default {
  setup(){
    useAuthProvider();
  },
  mounted(){
    const router = useRouter();

    try{
      const authContext = useAuth();

      const { userData } = authContext;

      if (!userData || !userData.token) {
        router.push('/');
        return;
      }
      else{
        router.push('/lk');
      }
    }
    catch (e){
      router.push('/');
      return;
    }
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
