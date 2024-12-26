import type {
  EssentialExpense,
  EssentialExpenseSimple,
  EssentialExpensesPaginated,
} from "@/interfaces/essential-expense";

export const useEssentialExpensesStore = defineStore(
  "essential-expenses",
  () => {
    const { $api } = useNuxtApp();

    const essentialExpenses = ref<EssentialExpensesPaginated>({
      items: [],
      pagination: {},
    });
    const loadingAll = ref(false);
    const loadingById = ref(false);
    const loadingForm = ref(false);
    const search = ref("");
    const nameSearch = ref("");

    watch(nameSearch, () => {
      search.value = String(Date.now());
    });

    const getAllEssentialExpenses = async ({
      page = 1,
      itemsPerPage = 10,
    } = {}): Promise<void> => {
      loadingAll.value = true;
      try {
        const params = {
          page,
          per_page: itemsPerPage,
          ...(nameSearch.value && { name: nameSearch.value }),
        };
        const response = await $api.essentialExpense.getAll(params);
        if (response) essentialExpenses.value = response;
      } finally {
        loadingAll.value = false;
      }
    };

    const getEssentialExpenseById = async (
      id: number
    ): Promise<EssentialExpenseSimple | undefined> => {
      loadingById.value = true;
      try {
        const response = await $api.essentialExpense.getById(id);
        return response ?? undefined;
      } finally {
        loadingById.value = false;
      }
    };

    const createEssentialExpense = async (
      data: EssentialExpenseSimple
    ): Promise<EssentialExpense | undefined> => {
      loadingForm.value = true;
      try {
        const response = await $api.essentialExpense.create(data);
        if (response) {
          essentialExpenses.value.items.unshift(response);
          essentialExpenses.value.pagination.total =
            (essentialExpenses.value.pagination.total ?? 0) + 1;
          essentialExpenses.value.items = essentialExpenses.value.items.slice(
            0,
            10
          );
          return response;
        }
        return undefined;
      } finally {
        loadingForm.value = false;
      }
    };

    const updateEssentialExpense = async (
      id: number,
      data: EssentialExpenseSimple
    ): Promise<EssentialExpense | undefined> => {
      loadingForm.value = true;
      try {
        const response = await $api.essentialExpense.update(id, data);
        if (response) {
          const index = essentialExpenses.value.items.findIndex(
            (i) => i.id === id
          );
          if (index !== -1) essentialExpenses.value.items[index] = response;
          return response;
        }
        return undefined;
      } finally {
        loadingForm.value = false;
      }
    };

    const deleteEssentialExpense = async (id: number): Promise<void> => {
      loadingForm.value = true;
      try {
        const response = await $api.essentialExpense.delete(id);
        if (response) {
          essentialExpenses.value.items = essentialExpenses.value.items.filter(
            (i) => i.id !== id
          );
          essentialExpenses.value.pagination.total =
            (essentialExpenses.value.pagination.total ?? 0) - 1;
        }
      } finally {
        loadingForm.value = false;
      }
    };

    return {
      essentialExpenses,
      loadingAll,
      loadingById,
      loadingForm,
      search,
      nameSearch,
      getAllEssentialExpenses,
      getEssentialExpenseById,
      createEssentialExpense,
      updateEssentialExpense,
      deleteEssentialExpense,
    };
  }
);
