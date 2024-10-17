<template>
  <v-data-table
    :headers="headers"
    :items="props.expenses"
    items-per-page="-1"
    :height="props.height"
    hover
    hide-default-footer
    disable-sort
    class="custom-scroll"
  />
</template>

<script setup lang="ts">
interface Expense {
  name: string;
  expected_value: number;
  paid_value: number;
}
interface Header {
  title: string;
  value: string;
  align?: "start" | "center" | "end";
}

const props = defineProps({
  expenses: {
    type: Array as PropType<Expense[]>,
    required: true,
  },
  height: {
    type: [String, Number],
    default: 350,
  },
});

const headers: Header[] = [
  { title: "Expense", value: "name", align: "start" },
  { title: "Expected", value: "expected_value", align: "center" },
  { title: "Paid", value: "paid_value", align: "center" },
];
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
