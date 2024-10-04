import { reactive, provide, inject } from 'vue';

const AuthContextSymbol = Symbol();

export const useAuthProvider = () => {
  const state = reactive({
    userData: JSON.parse(localStorage.getItem('userData')) || {},
  });

  const login = (data) => {
    state.userData = data;
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const logout = () => {
    state.userData = {};
    localStorage.removeItem('userData');
  };

  provide(AuthContextSymbol, {
    userData: state.userData,
    login,
    logout,
  });
};

export const useAuth = () => {
  const auth = inject(AuthContextSymbol);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};