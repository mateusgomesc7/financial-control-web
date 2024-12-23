import type { Income } from "@/interfaces/income";

export const useIncomesStore = defineStore("incomes", () => {
  const { $api } = useNuxtApp();

  const incomes = ref<Income[]>([]);
  const loading = ref(false);

  const getAllIncomes = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await $api.income.getAll();
      if (response) incomes.value = response.incomes;
    } finally {
      loading.value = false;
    }
  };

  return {
    incomes,
    loading,
    getAllIncomes,
  };
});
