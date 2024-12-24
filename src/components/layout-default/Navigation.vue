<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="display.mdAndUp.value"
      :permanent="display.mdAndUp.value || display.lgAndUp.value"
      :rail="display.mdAndUp.value"
      color="primary"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-account"
          title="Mateus Gomes"
          subtitle="Perfil"
        />
      </v-list>
      <v-divider />
      <v-list v-model:opened="openedGroups" density="compact" nav>
        <template v-for="menu in menus">
          <v-list-group
            v-if="menu.children"
            :key="menu.title"
            :prepend-icon="menu.icon"
            :value="menu.path"
            :title="menu.title"
          >
            <template #activator="{ props }">
              <v-list-item v-bind="props" />
            </template>

            <v-list-item
              v-for="child in menu.children"
              :key="child.path"
              :title="child.title"
              :prepend-icon="child.icon"
              :active="isActive(child.path)"
              @click="navigateTo(child.path)"
            />
          </v-list-group>

          <v-list-item
            v-else
            :key="menu.path"
            :prepend-icon="menu.icon"
            :title="menu.title"
            :active="isActive(menu.path)"
            @click="navigateTo(menu.path)"
          />
        </template>
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

const route = useRoute();

const display = useDisplay();
const drawer: Ref<boolean> = ref(display.mdAndUp.value);
const menus = ref([
  {
    title: "Dashboard",
    path: "/",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Registrar",
    path: "/register",
    icon: "mdi-table-plus",
    children: [
      {
        title: "Renda Mensal",
        path: "/register/incomes",
        icon: "mdi-circle-small",
      },
      {
        title: "Despesas Essenciais",
        path: "/register/essential-expenses",
        icon: "mdi-circle-small",
      },
      {
        title: "Despesas Não Essenciais",
        path: "/register/non-essential-expenses",
        icon: "mdi-circle-small",
      },
    ],
  },
]);

const openedGroups = ref([""]);

watch(
  () => route.path,
  (newPath) => {
    openedGroups.value = [];
    menus.value.forEach((menu) => {
      if (menu.children) {
        menu.children.forEach((child) => {
          if (child.path === newPath) {
            openedGroups.value.push(menu.path);
          }
        });
      }
    });
  },
  { immediate: true }
);

const isActive = (value: string) => {
  return route.path === value;
};
</script>

<style scoped>
:deep(.v-list-group__items) .v-list-item {
  padding-left: 8px !important;
}
</style>
