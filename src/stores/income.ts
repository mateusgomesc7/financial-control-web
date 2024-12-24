import type { Income, IncomeSimple } from "@/interfaces/income";

export const useIncomesStore = defineStore("incomes", () => {
  const { $api } = useNuxtApp();

  const incomes = ref<Income[]>([]);
  const loadingAll = ref(false);
  const loadingById = ref(false);
  const loadingForm = ref(false);

  const getAllIncomes = async (): Promise<void> => {
    loadingAll.value = true;
    try {
      const response = await $api.income.getAll();
      if (response) incomes.value = response.incomes;
    } finally {
      loadingAll.value = false;
    }
  };

  const getIncomeById = async (id: number): Promise<Income | undefined> => {
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
        incomes.value.unshift(response);
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
        const index = incomes.value.findIndex((i) => i.id === id);
        if (index !== -1) incomes.value[index] = response;
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
      if (response) incomes.value = incomes.value.filter((i) => i.id !== id);
    } finally {
      loadingForm.value = false;
    }
  };

  return {
    incomes,
    loadingAll,
    loadingById,
    loadingForm,
    getAllIncomes,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome,
  };
});
