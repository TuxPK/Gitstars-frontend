<template>
  <q-page class="bg-grey-3">
    <div class="row flex flex-center" style="min-height: 100vh">
      <div class="col-sm-10 col-xs-8 col-md-3 flex-center">
        <div class="row flex-center q-mb-lg">
          <q-card class="bg-maindark q-pa-md" style="font-size: xx-large; color: white;">
            GitStars ✨
          </q-card>
        </div>
        <q-card class="q-py-xl bg-grey-2">
          <div class="row flex-center q-mb-xl">
            <div class="col-10">
              <q-input
                v-model="githubLogin"
                class="q-ml-sm"
                clearable
                label="Github login"
                color="green"
              >
              </q-input>
            </div>
          </div>
          <div class="row flex-center">
            <q-btn
              class="bg-maindark flex-center"
              type="a"
              text-color="white"
              label="Github"
              icon="fab fa-github"
              size="large"
              :loading="githubValidationLoading"
              :href="getGithubValidationURL()"
              @click="githubValidationLoading = true"
            >
            </q-btn>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      githubValidationLoading: false,
      githubLogin: null,
      githubUrl: 'https://github.com/login/oauth/authorize?',
      clientId: process.env.GITHUB_CLIENT_ID,
    };
  },
  methods: {
    getGithubValidationURL() {
      return `${this.githubUrl}client_id=${this.clientId}&login=${this.githubLogin}&redirect_uri=${window.origin}/login`;
    },
  },
};
</script>
