import axios from 'axios';

export async function get() {
  this.commit('users/loadingUsers');

  const url = 'github|user';

  await axios.get(url)
    .then((response) => {
      const {
        id, login, name, avatar_url,
      } = response.data;

      this.commit('users/set', {
        id, login, name, avatar_url,
      });
    });
}
