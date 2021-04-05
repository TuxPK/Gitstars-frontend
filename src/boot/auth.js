import axios from 'axios';

export default function ({ router, Vue }) {
  Vue.auth = {
    async login(code) {
      await axios.get(`api|session/login/${code}`)
        .then((response) => setGithubToken(response))
        .then((response) => setApiToken(response))
        .then(() => Vue.messages.success('Seja bem vindo :)'))
        .catch(() => Vue.messages.error('Ops, tivemos algum problema, aguarde alguns minutos e tente mais tarde'));
    },
    async logout() {
      clearToken();
      return router.go('home');
    },
    isAuthenticated() {
      return localStorage.getItem('git_token') && localStorage.getItem('api_token');
    },
  };

  Vue.prototype.auth = Vue.auth;
}

function setGithubToken(response) {
  const { github_token } = response.data;

  localStorage.setItem('git_token', github_token);

  return response;
}

function setApiToken(response) {
  const { api_token } = response.data;

  localStorage.setItem('api_token', api_token);

  return response;
}

function clearToken() {
  localStorage.removeItem('git_token');
  localStorage.removeItem('api_token');
}
