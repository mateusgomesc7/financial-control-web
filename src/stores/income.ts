import type { Income } from "@/interfaces/income";

export const useTypesStore = defineStore("types", () => {
  const { $api } = useNuxtApp();

  const incomes = ref<Income[]>([]);
  const loading = ref(false);

  const getAllIncomes = async (): Promise<void> => {
    loading.value = true;
    const params = { order_by: "id", order_desc: "false" };
    try {
      const response = await $api.type.getAll(params);
      if (response) incomes.value = response;
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
