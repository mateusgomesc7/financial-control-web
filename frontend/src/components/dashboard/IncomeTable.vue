<template>
  <div class="pa-4">
    <v-data-table
      :headers="headers"
      :items="incomes"
      item-value="description"
      items-per-page="-1"
      height="300"
      hover
      hide-default-footer
      disable-sort
      class="custom-scroll"
    />
  </div>
</template>

<script setup lang="ts">
const headers = ref([
  { title: "Description", key: "description", align: "start" },
  { title: "Value", key: "value", align: "center" },
]);
const incomes = ref([
  { description: "Net salary", value: 3000 },
  { description: "Net salary", value: 5000 },
  { description: "Extra income", value: 500 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
  { description: "Extra income", value: 300 },
]);
</script>

<style scoped>
:deep(.v-data-table-header__content) {
  font-weight: bold;
  color: rgb(var(--v-theme-primary));
}

:deep(.v-data-table__td) {
  color: rgb(var(--v-theme-primary)) !important;
}

.custom-scroll:deep(.v-table__wrapper) {
  max-height: 300px;
  overflow-y: auto;
}
.custom-scroll:deep(.v-table__wrapper)::-webkit-scrollbar {
  width: 8px;
}
.custom-scroll:deep(.v-table__wrapper)::-webkit-scrollbar-thumb {
  background-color: rgb(var(--v-theme-primary));
  border-radius: 10px;
}
.custom-scroll:deep(.v-table__wrapper)::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}
</style>
