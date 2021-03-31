import axios from 'axios';

export default ({ Vue }) => {
  axios.interceptors.request.use((config) => {
    const urls = config.url.split('|');

    if (urls[0] === 'api') {
      config.url = `http://localhost:3333/${urls[1]}`;
    }
    if (urls[0] === 'github') {
      config.url = `https://api.github.com/${urls[1]}`;
      config.headers.Authorization = localStorage.getItem('git_token');
    }

    return config;
  });

  Vue.prototype.$axios = axios;
};
