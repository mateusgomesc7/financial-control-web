import type { User } from "@/interfaces/user";

export const useUserStore = defineStore(
  "financial_control_user",
  () => {
    const { $api } = useNuxtApp();
    const currentUser = ref<User | null>();
    const users = ref<User[]>([]);

    const getCurrentUser = async (): Promise<void> => {
      const response = await $api.user.getProfile();
      if (response) {
        currentUser.value = response;
      }
    };

    const getAllUsers = async (): Promise<void> => {
      const response = await $api.user.getAll();
      if (response) {
        users.value = response;
      }
    };

    return {
      currentUser,
      getCurrentUser,
      getAllUsers,
      users,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
