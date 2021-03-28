<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          GitStar ✨
        </q-toolbar-title>

        <div>Marcos Gauderth</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <MainMenu
          v-for="link in menu"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <MainPages />
    </q-page-container>
  </q-layout>
</template>

<script>
import MainMenu from 'components/MainMenu.vue';
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
  components: { MainMenu, MainPages },
  data() {
    return {
      leftDrawerOpen: false,
      menu: menuData,
    };
  },
};
</script>
