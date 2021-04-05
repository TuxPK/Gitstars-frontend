<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header bg-maindark">
      <q-toolbar>
        <q-toolbar-title>
          GitStar ✨
        </q-toolbar-title>

        <div class="q-mr-lg">
          {{ user.login }}
          <q-avatar
            size="md"
            class="q-ml-md"
            v-if="user.avatar_url"
            :title="'@'+user.avatar_url"
          >
            <img :src="user.avatar_url">
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

        <q-btn
          flat
          rounded
          dense
          icon="fas fa-sign-out-alt"
          label="Sair"
          @click.native="logout"
        >

        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <MainPages />
    </q-page-container>
  </q-layout>
</template>

<script>
import MainPages from 'src/components/MainPages.vue';

const menuData = [
  {
    title: 'Home',
    path: '/',
    icon: 'home',
  },
];

export default {
  name: 'MainLayout',
  components: { MainPages },
  data() {
    return {
      leftDrawerOpen: false,
      menu: menuData,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      if (!this.user.login && !this.$store.state.users.loading_users) {
        await this.$store.dispatch('users/get');
      }
    },
    logout() {
      this.auth.logout();
    },
  },
  computed: {
    user() {
      return this.$store.state.users.user;
    },
  },
};
</script>
