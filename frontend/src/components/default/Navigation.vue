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
          prepend-icon="mdi-account"
          title="Mateus Gomes"
          subtitle="Profile"
        />
      </v-list>
      <v-divider />
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="dashboard"
        />
        <v-list-group
          prepend-icon="mdi-table-plus"
          title="Register"
          value="register"
        >
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Register"></v-list-item>
          </template>

          <v-list-item
            v-for="([title], i) in registers"
            :key="i"
            prepend-icon="mdi-circle-small"
            :title="title"
            :value="title"
          ></v-list-item>
        </v-list-group>
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
const registers = [
  ["Monthly Income"],
  ["Essential Expenses"],
  ["Non-Essential Expenses"],
];
</script>

<style scoped>
:deep(.v-list-group__items) .v-list-item {
  padding-left: 8px !important;
}
</style>
