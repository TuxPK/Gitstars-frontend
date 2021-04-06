<template>
  <q-page class="flex">
    <div class="col">
      <div class="row q-ma-lg">
        <q-card
          class="q-mb-lg q-pa-lg full-width"
          inline
        >
          <div class="row">
            <q-input
                v-model="filterTag"
                class="q-ml-sm"
                clearable
                label="Buscar tags"
                color="green"
              >
              </q-input>
          </div>
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
          <q-card-actions>
            <q-btn
              dense
              flat
              label="Adicionar Tag"
              class="q-ml-md q-pa-sm bg-blue"
              color="white"
              icon="fas fa-plus"
              :loading="tags.creating_tags || tags.updating_tags"
              @click="showTagField(repository.id)"
            />
          </q-card-actions>
          <q-card-section>
            <div class="row">
              <q-chip
                square
                v-for="tag of getRepositoryTags(repository.id)"
                :key="tag.uuid"
              >
                {{ tag.name }}
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog
      v-model="opened_add_tag_modal"
    >
      <q-card class="q-mb-md" style="min-width: 40vh !important;">
        <q-card-section>
          <div class="col-md-6 col-sm-6 col-xs-12 q-pa-sm">
            <q-card class="q-mb-md">
              <q-card-section style="color: #35495E">
                <div
                  class="row items-center justify-between"
                  style="font-size: 16px; text-transform: uppercase"
                >
                  Tags
                </div>
              </q-card-section>
            </q-card>
            <q-card class="q-mb-md q-pa-md">
              <q-input
                v-model="tag.name"
                class="q-ml-sm"
                clearable
                label="Add tag"
                color="green"
                maxlength="20"
              >
                <template v-slot:after>
                  <q-btn
                    class="bg-green"
                    round
                    dense
                    flat
                    text-color="white"
                    icon="fas fa-plus"
                    @click="!tag.uuid ? addTag() : updateTag()"
                    :disable="!tag.name"
                  />
                </template>
              </q-input>
            </q-card>
            <q-card class="q-mb-md" style="height: 33vh">
              <q-scroll-area style="height: 100%;">
                <q-card-section>
                  <div
                    v-for="tag in getRepositoryTags(tag.repository_id)"
                    v-bind:key="tag.uuid"
                  >
                    <q-item>
                      <q-item-section>
                        {{ tag.name }}
                      </q-item-section>
                      <q-item-section side>
                        <q-btn
                          round
                          size="sm"
                          class="bg-purple"
                          text-color="white"
                          icon="fas fa-edit"
                          @click="editTagName(tag)"
                        />
                      </q-item-section>
                      <q-item-section side>
                        <q-btn
                          round
                          size="sm"
                          class="bg-red"
                          text-color="white"
                          icon="fas fa-trash-alt"
                          @click="removeTag(tag.uuid)"
                        />
                      </q-item-section>
                    </q-item>
                  </div>
                </q-card-section>
              </q-scroll-area>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
      await this.getTags();
      this.getRepositories();
    },
    async getUser() {
      if (!this.user.login && !this.$store.state.users.loading_users) {
        await this.$store.dispatch('users/get');
      }
    },
    async getTags() {
      if (this.tags.length <= 0) {
        await this.$store.dispatch('tags/getAll');
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
    showTagField(repository_id) {
      this.tag.repository_id = repository_id;
      this.opened_add_tag_modal = true;
    },
    editTagName(tag) {
      const { uuid, name, repository_id } = tag;
      this.tag = { uuid, name, repository_id };
    },
    addTag() {
      this.$store.dispatch('tags/create', this.tag);

      this.clearTag();
    },
    updateTag() {
      this.$store.dispatch('tags/update', this.tag);

      this.clearTag();
    },
    removeTag(uuid) {
      this.$store.dispatch('tags/remove', uuid);
    },
    getRepositoryTags(repository_id) {
      return this.tags.filter((tag) => tag.repository_id === repository_id);
    },
    clearTag() {
      this.tag.uuid = null;
      this.tag.name = null;
    },
  },
  computed: {
    user() {
      return this.$store.state.users.user;
    },
    tags() {
      return this.$store.state.tags.tags;
    },
    repositories() {
      return this.$store.state.repositories.repositories
        .filter((repository) => !this.filterTag || (this.tags
          .filter((tag) => tag.name.toLowerCase()
            .includes(this.filterTag.toLowerCase()))
          .map((tag) => tag.repository_id))
          .includes(repository.id));
    },
  },
};
</script>
