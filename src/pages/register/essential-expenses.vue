<template>
  <div>
    <EssentialExpensesFormModal
      :dialog-show="essentialExpenseDialog"
      :essential-expense-id="essentialExpenseId"
      @update:show="essentialExpenseDialog = false"
    />
    <UtilsConfirmationModal
      :dialog-show="deleteDialog"
      type="error"
      title="Deletar Despensa Essencial"
      question="Tem certeza que deseja deletar essa despesa?"
      @update:show="deleteDialog = false"
      @yes="deleteEssentialExpense(essentialExpenseId)"
    />
    <h1 class="mb-4 text-primary">Despesas Essenciais</h1>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between">
        <v-text-field
          v-model="essentialExpenseStore.nameSearch"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Pesquisar despesa essencial"
          variant="outlined"
          max-width="400"
          clearable
          hide-details
          single-line
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
          v-model:items-per-page="
            essentialExpenseStore.essentialExpenses.pagination.per_page
          "
          :headers="headers"
          :items="essentialExpenseStore.essentialExpenses.items"
          :items-length="
            essentialExpenseStore.essentialExpenses.pagination.total ?? 0
          "
          :loading="essentialExpenseStore.loadingAll"
          :search="essentialExpenseStore.search"
          disable-sort
          @update:options="essentialExpenseStore.getAllEssentialExpenses"
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
const essentialExpenseStore = useEssentialExpensesStore();
const essentialExpenseDialog = ref(false);
const deleteDialog = ref(false);
const essentialExpenseId = ref<number | null>(null);

const headers = ref([
  { title: "Nome", key: "name", align: "start", sortable: false },
  { title: "Esperado", key: "expected", align: "end", sortable: false },
  { title: "Membro", key: "member", align: "start", sortable: false },
  { title: "Criação", key: "created_at", align: "start", sortable: false },
  { title: "Atualização", key: "updated_at", align: "start", sortable: false },
  { title: "Actions", key: "actions", align: "center", sortable: false },
]);

const openDialog = (id: number | null = null) => {
  essentialExpenseId.value = id;
  essentialExpenseDialog.value = true;
};

const openDeleteDialog = (id: number) => {
  essentialExpenseId.value = id;
  deleteDialog.value = true;
};

const deleteEssentialExpense = async (id: number | null) => {
  if (!id) return;

  await essentialExpenseStore.deleteEssentialExpense(id);
  essentialExpenseId.value = null;
};
</script>
