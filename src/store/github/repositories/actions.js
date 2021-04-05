import axios from 'axios';

export function getAll(state, user) {
  this.commit('repositories/loadingRepositories');

  const url = `github|users/${user}/starred`;

  axios.get(url)
    .then((response) => {
      const repositories = response.data
        .map((repository) => extractData(repository));

      this.commit('repositories/set', repositories);
    });
}

function extractData(repository) {
  const {
    id, name, html_url,
    owner: {
      avatar_url: owner_avatar_url,
      login: owner_login,
    },
  } = repository;

  return {
    id,
    name,
    html_url,
    owner: {
      avatar_url: owner_avatar_url,
      login: owner_login,
    },
    tags: [],
  };
}
