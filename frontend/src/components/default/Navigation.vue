<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="display.mdAndUp.value"
      :permanent="display.mdAndUp.value || display.lgAndUp.value"
      :rail="display.mdAndUp.value && !display.xlAndUp.value"
      color="primary"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          subtitle="sandra_a88@gmailcom"
          title="Sandra Adams"
        />
      </v-list>
      <v-divider />
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          title="My Files"
          value="myfiles"
        />
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Shared with me"
          value="shared"
        />
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="!display.mdAndUp.value" color="primary" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
      <v-toolbar-title>My files</v-toolbar-title>
      <v-spacer />
      <template v-if="$vuetify.display.mdAndUp">
        <v-btn icon="mdi-magnify" variant="text" />
        <v-btn icon="mdi-filter" variant="text" />
      </template>
      <v-btn icon="mdi-dots-vertical" variant="text" />
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const display = useDisplay();
const drawer: Ref<boolean> = ref(display.mdAndUp.value);
</script>
