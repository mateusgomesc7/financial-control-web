<template>
  <div>
    <IncomesFormModal v-model="incomeDialog" :income-id="incomeId" />
    <h1>Receita Mensal</h1>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between">
        <v-text-field
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Pesquisar receita"
          variant="outlined"
          max-width="400"
          hide-details
          single-line
          @click:append-inner="onClick"
        />
        <v-btn
          prepend-icon="mdi-plus"
          variant="flat"
          color="accent"
          @click="openDialog(null)"
        >
          Adicionar
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="items">
          <template #[`item.actions`]="{ item }">
            <v-icon
              class="mr-2"
              color="accent"
              size="20"
              @click="openDialog(item.id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon color="error" size="20">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const loaded = ref(false);
const loading = ref(false);
const incomeDialog = ref(false);
const incomeId = ref<number | null>(null);

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
}

const headers = ref([
  { title: "Nome", key: "name", align: "start" },
  { title: "Receita", key: "amount", align: "end" },
  { title: "Membro", key: "member", align: "start" },
  { title: "Criação", key: "create_at", align: "start" },
  { title: "Atualização", key: "update_at", align: "start" },
  { title: "Actions", key: "actions", align: "center" },
]);

const items = [
  {
    id: 1,
    name: "African Wild Dog",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 2,
    name: "African Lion",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 3,
    name: "African Penguin",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 4,
    name: "African Rock Python",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 5,
    name: "African Elephant",
    amount: "R$ 1000,00",
    member: "Herbivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 6,
    name: "African Wild Dog",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 7,
    name: "African Lion",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 8,
    name: "African Penguin",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 9,
    name: "African Rock Python",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 10,
    name: "African Elephant",
    amount: "R$ 1000,00",
    member: "Herbivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 11,
    name: "African Wild Dog",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 12,
    name: "African Lion",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 13,
    name: "African Penguin",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
  {
    id: 14,
    name: "African Rock Python",
    amount: "R$ 1000,00",
    member: "Carnivore",
    create_at: "22/12/2024",
    update_at: "22/12/2024",
  },
];

const openDialog = (id: number | null = null) => {
  incomeId.value = id;
  incomeDialog.value = true;
};
</script>
