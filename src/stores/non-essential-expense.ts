import type {
  NonEssentialExpense,
  NonEssentialExpenseSimple,
  NonEssentialExpensesPaginated,
} from "@/interfaces/non-essential-expense";

export const useNonEssentialExpensesStore = defineStore(
  "non-essential-expenses",
  () => {
    const { $api } = useNuxtApp();

    const nonEssentialExpenses = ref<NonEssentialExpensesPaginated>({
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

    const getAllNonEssentialExpenses = async ({
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
        const response = await $api.nonEssentialExpense.getAll(params);
        if (response) nonEssentialExpenses.value = response;
      } finally {
        loadingAll.value = false;
      }
    };

    const getNonEssentialExpenseById = async (
      id: number
    ): Promise<NonEssentialExpenseSimple | undefined> => {
      loadingById.value = true;
      try {
        const response = await $api.nonEssentialExpense.getById(id);
        return response ?? undefined;
      } finally {
        loadingById.value = false;
      }
    };

    const createNonEssentialExpense = async (
      data: NonEssentialExpenseSimple
    ): Promise<NonEssentialExpense | undefined> => {
      loadingForm.value = true;
      try {
        const response = await $api.nonEssentialExpense.create(data);
        if (response) {
          nonEssentialExpenses.value.items.unshift(response);
          nonEssentialExpenses.value.pagination.total =
            (nonEssentialExpenses.value.pagination.total ?? 0) + 1;
          nonEssentialExpenses.value.items =
            nonEssentialExpenses.value.items.slice(0, 10);
          return response;
        }
        return undefined;
      } finally {
        loadingForm.value = false;
      }
    };

    const updateNonEssentialExpense = async (
      id: number,
      data: NonEssentialExpenseSimple
    ): Promise<NonEssentialExpense | undefined> => {
      loadingForm.value = true;
      try {
        const response = await $api.nonEssentialExpense.update(id, data);
        if (response) {
          const index = nonEssentialExpenses.value.items.findIndex(
            (i) => i.id === id
          );
          if (index !== -1) nonEssentialExpenses.value.items[index] = response;
          return response;
        }
        return undefined;
      } finally {
        loadingForm.value = false;
      }
    };

    const deleteNonEssentialExpense = async (id: number): Promise<void> => {
      loadingForm.value = true;
      try {
        const response = await $api.nonEssentialExpense.delete(id);
        if (response) {
          nonEssentialExpenses.value.items =
            nonEssentialExpenses.value.items.filter((i) => i.id !== id);
          nonEssentialExpenses.value.pagination.total =
            (nonEssentialExpenses.value.pagination.total ?? 0) - 1;
        }
      } finally {
        loadingForm.value = false;
      }
    };

    return {
      nonEssentialExpenses,
      loadingAll,
      loadingById,
      loadingForm,
      search,
      nameSearch,
      getAllNonEssentialExpenses,
      getNonEssentialExpenseById,
      createNonEssentialExpense,
      updateNonEssentialExpense,
      deleteNonEssentialExpense,
    };
  }
);
