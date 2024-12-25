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
          v-model:items-per-page="incomesStore.incomes.pagination.per_page"
          :headers="headers"
          :items="incomesStore.incomes.items"
          :items-length="incomesStore.incomes.pagination.total ?? 0"
          :loading="incomesStore.loadingAll"
          disable-sort
          @update:options="incomesStore.getAllIncomes"
        >
          <template #[`item.member`]="{ item }">
            {{ item.member.name }}
          </template>
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
  { title: "Nome", key: "name", align: "start", sortable: false },
  { title: "Receita", key: "amount", align: "end", sortable: false },
  { title: "Membro", key: "member", align: "start", sortable: false },
  { title: "Criação", key: "created_at", align: "start", sortable: false },
  { title: "Atualização", key: "updated_at", align: "start", sortable: false },
  { title: "Actions", key: "actions", align: "center", sortable: false },
]);

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

const deleteIncome = async (id: number | null) => {
  if (!id) return;

  await incomesStore.deleteIncome(id);
  incomeId.value = null;
};
</script>
