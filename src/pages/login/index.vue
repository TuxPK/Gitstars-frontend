<template>
  <q-page class="bg-grey-3">
    <div class="row flex flex-center" style="min-height: 100vh">
      <div class="col-sm-10 col-xs-8 col-md-3 flex-center">
        <div class="row flex-center q-mb-lg">
          <q-card class="bg-grey-10 q-pa-md" style="font-size: xx-large; color: white;">
            GitStars ✨
          </q-card>
        </div>
        <q-card class="q-py-xl bg-grey-2">
          <div class="row flex-center">
            <q-btn
              class="bg-grey-10 flex-center"
              type="a"
              color="white"
              label="Github"
              icon="fab fa-github"
              size="large"
              :loading="githubValidationLoading"
              :href="githubValidationURL"
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
const githubUrl = 'https://github.com/login/oauth/authorize?';
const clientId = process.env.GITHUB_CLIENT_ID;

export default {
  name: 'Login',
  data() {
    return {
      githubValidationLoading: false,
      githubValidationURL: `${githubUrl}client_id=${clientId}&redirect_uri=${window.origin}/login`,
    };
  },
};
</script>
