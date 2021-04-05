import axios from 'axios';

export default ({ Vue }) => {
  axios.interceptors.request.use((config) => {
    const urls = config.url.split('|');

    if (urls[0] === 'api') {
      config.url = `http://localhost:3333/${urls[1]}`;
      config.headers.api_token = localStorage.getItem('api_token');
    }
    if (urls[0] === 'github') {
      config.url = `https://api.github.com/${urls[1]}`;
      config.headers.Authorization = localStorage.getItem('git_token');
    }

    return config;
  });

  axios.interceptors.response.use((config) => config, async (error) => {
    const isAuth = await Vue.auth.isAuthenticated();

    if (error.response.status === 401 && isAuth) {
      Vue.auth.logout();
    }
  });

  Vue.prototype.$axios = axios;
};
