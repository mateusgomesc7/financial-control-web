import type {
  Income,
  IncomeSimple,
  IncomesPaginated,
} from "@/interfaces/income";

export const useIncomesStore = defineStore("incomes", () => {
  const { $api } = useNuxtApp();

  const incomes = ref<IncomesPaginated>({ items: [], pagination: {} });
  const loadingAll = ref(false);
  const loadingById = ref(false);
  const loadingForm = ref(false);
  const search = ref("");
  const nameSearch = ref("");

  watch(nameSearch, () => {
    search.value = String(Date.now());
  });

  const getAllIncomes = async ({
    page = 1,
    itemsPerPage = 10,
  } = {}): Promise<void> => {
    loadingAll.value = true;
    console.log("search", search);
    try {
      const params = {
        page,
        per_page: itemsPerPage,
        ...(nameSearch.value && { name: nameSearch.value }),
      };
      const response = await $api.income.getAll(params);
      if (response) incomes.value = response;
    } finally {
      loadingAll.value = false;
    }
  };

  const getIncomeById = async (
    id: number
  ): Promise<IncomeSimple | undefined> => {
    loadingById.value = true;
    try {
      const response = await $api.income.getById(id);
      return response ?? undefined;
    } finally {
      loadingById.value = false;
    }
  };

  const createIncome = async (
    data: IncomeSimple
  ): Promise<Income | undefined> => {
    loadingForm.value = true;
    try {
      const response = await $api.income.create(data);
      if (response) {
        incomes.value.items.unshift(response);
        incomes.value.pagination.total =
          (incomes.value.pagination.total ?? 0) + 1;
        incomes.value.items = incomes.value.items.slice(0, 10);
        return response;
      }
      return undefined;
    } finally {
      loadingForm.value = false;
    }
  };

  const updateIncome = async (
    id: number,
    data: IncomeSimple
  ): Promise<Income | undefined> => {
    loadingForm.value = true;
    try {
      const response = await $api.income.update(id, data);
      if (response) {
        const index = incomes.value.items.findIndex((i) => i.id === id);
        if (index !== -1) incomes.value.items[index] = response;
        return response;
      }
      return undefined;
    } finally {
      loadingForm.value = false;
    }
  };

  const deleteIncome = async (id: number): Promise<void> => {
    loadingForm.value = true;
    try {
      const response = await $api.income.delete(id);
      if (response)
        incomes.value.items = incomes.value.items.filter((i) => i.id !== id);
    } finally {
      loadingForm.value = false;
    }
  };

  return {
    incomes,
    loadingAll,
    loadingById,
    loadingForm,
    search,
    nameSearch,
    getAllIncomes,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome,
  };
});
