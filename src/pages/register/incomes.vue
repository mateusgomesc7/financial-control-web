<template>
  <div>
    <IncomesFormModal
      :dialog-show="incomeDialog"
      :income-id="incomeId"
      @update:show="incomeDialog = false"
    />
    <UtilsConfirmationModal
      :dialog-show="deleteDialog"
      type="error"
      title="Deletar Renda"
      question="Tem certeza que deseja deletar essa renda?"
      @update:show="deleteDialog = false"
      @yes="deleteIncome(incomeId)"
    />
    <h1 class="mb-4 text-primary">Renda Mensal</h1>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between">
        <v-text-field
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Pesquisar renda"
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
        <v-data-table-server
          :headers="headers"
          :items="incomesStore.incomes"
          :loading="incomesStore.loadingAll"
          disable-sort
        >
          <template #[`item.actions`]="{ item }">
            <v-icon
              class="mr-2"
              color="accent"
              size="20"
              @click="openDialog(item.id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon color="error" size="20" @click="openDeleteDialog(item.id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const incomesStore = useIncomesStore();
const loaded = ref(false);
const loading = ref(false);
const incomeDialog = ref(false);
const deleteDialog = ref(false);
const incomeId = ref<number | null>(null);

const headers = ref([
  { title: "Nome", key: "name", align: "start" },
  { title: "Receita", key: "amount", align: "end" },
  { title: "Membro", key: "id_member_fk", align: "start" },
  { title: "Criação", key: "created_at", align: "start" },
  { title: "Atualização", key: "updated_at", align: "start" },
  { title: "Actions", key: "actions", align: "center" },
]);

onMounted(() => {
  loadIncomes();
});

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
}

const openDialog = (id: number | null = null) => {
  incomeId.value = id;
  incomeDialog.value = true;
};

const openDeleteDialog = (id: number) => {
  incomeId.value = id;
  deleteDialog.value = true;
};

const loadIncomes = async () => {
  await incomesStore.getAllIncomes();
};

const deleteIncome = async (id: number | null) => {
  if (!id) return;

  await incomesStore.deleteIncome(id);
  incomeId.value = null;
};
</script>
