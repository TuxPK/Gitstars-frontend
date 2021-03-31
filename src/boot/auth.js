import axios from 'axios';

export default function ({ store, Vue }) {
  Vue.auth = {
    async getAuthentication(code) {
      if (!code) return false;
      const githubCode = code;

      const githubAuth = await getGithubToken(githubCode);
      setGithubToken(githubAuth);

      await store.dispatch();
    },
  };

  Vue.prototype.auth = Vue.auth;
}

async function getGithubToken(code) {
  if (!code) return false;

  const githubAuth = await axios.post('api|github-auth/token', { code })
    .catch(() => false);

  return githubAuth;
}

function setGithubToken(githubAuth) {
  if (!githubAuth) return false;

  const { token, type } = githubAuth.data;

  return localStorage.setItem('git_token', `${type} ${token}`);
}
