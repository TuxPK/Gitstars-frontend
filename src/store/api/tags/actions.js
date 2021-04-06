import axios from 'axios';

import Vue from 'vue';

export async function getAll() {
  this.commit('tags/loadingTags');

  const url = 'api|tag';

  await axios.get(url)
    .then((response) => {
      const tags = response.data;

      this.commit('tags/set', tags);
    })
    .catch(() => Vue.messages.error('Ops, tivemos algum problema, aguarde alguns minutos e tente mais tarde'));
}

export function create(state, tag) {
  const { name, repository_uuid } = tag;
  this.commit('tags/creatingTags');

  const url = 'api|tag';
  const body = { name, repository_uuid };

  axios.post(url, body)
    .then((response) => {
      const tags = response.data;

      this.commit('tags/add', tags);

      Vue.messages.success('Tag criada com sucesso');
    })
    .catch(() => Vue.messages.error('Ops, tivemos algum problema, aguarde alguns minutos e tente mais tarde'));
}

export async function update(state, tag) {
  const { uuid, name, repository_uuid } = tag;
  this.commit('tags/creatingTags');

  const url = `api|tag/${tag.uuid}`;
  const body = { uuid, name, repository_uuid };

  await axios.put(url, body)
    .then(() => {
      this.commit('tags/edit', body);
      Vue.messages.success('Tag editada com sucesso');
    })
    .catch(() => Vue.messages.error('Ops, tivemos algum problema, aguarde alguns minutos e tente mais tarde'));
}

export function remove(state, uuid) {
  this.commit('tags/creatingTags');

  const url = `api|tag/${uuid}`;

  axios.delete(url)
    .then(() => {
      this.commit('tags/remove', uuid);
    })
    .catch(() => Vue.messages.error('Ops, tivemos algum problema, aguarde alguns minutos e tente mais tarde'));
}
