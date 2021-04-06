<template>
  <q-page class="flex">
    <div class="col">
      <div class="row q-ma-lg">
        <q-card
          class="q-mb-lg q-pa-lg full-width"
          inline
        >
        </q-card>
        <q-card
          v-for="repository in repositories"
          :key="repository.id"
          class="q-mb-lg full-width"
          inline
        >
          <q-card-section>
            <div class="row">
              <div class="col-md-grow col-sm-12 col-xs-12 q-mb-sm text-h6 ellipsis">
                {{ repository.name }}
                <q-btn
                  flat
                  class="q-ml-sm bg-darkblue"
                  color="white"
                  icon="fas fa-external-link-alt"
                  size="sm"
                  @click="openRepository(repository.html_url)"
                />
              </div>
              <div class="col-md-auto col-sm-12 col-xs-12 q-mb-sm">
                {{ repository.owner.login }}
                <q-avatar
                  size="md"
                  class="q-ml-md"
                  v-if="repository.owner.avatar_url"
                  :title="'@'+repository.owner.avatar_url"
                >
                  <img :src="repository.owner.avatar_url">
                </q-avatar>
                <q-avatar
                  v-else
                  size="md"
                  class="q-mr-sm"
                  color="grey-4"
                  text-color="white"
                  icon="fas fa-user"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'Home',
  data() {
    return {
      loadingProjects: true,
      opened_add_tag_modal: false,
      tag: {
        uuid: null,
        name: null,
        repository_id: null,
      },
      filterTag: '',
    };
  },
  mounted() {
    this.getStore();
  },
  methods: {
    async getStore() {
      await this.getUser();
      this.getRepositories();
    },
    async getUser() {
      if (!this.user.login && !this.$store.state.users.loading_users) {
        await this.$store.dispatch('users/get');
      }
    },
    getRepositories() {
      if (this.repositories.length <= 0) {
        this.$store.dispatch('repositories/getAll', this.user.login);
      }
    },
    openRepository(url) {
      openURL(url);
    },
  },
  computed: {
    user() {
      return this.$store.state.users.user;
    },
    repositories() {
      return this.$store.state.repositories.repositories;
    },
  },
};
</script>
