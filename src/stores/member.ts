import type { Member } from "@/interfaces/members";

export const useMemberStore = defineStore("members", () => {
  const { $api } = useNuxtApp();

  const members = ref<Member[]>([]);
  const loading = ref(false);

  const getAllMembers = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await $api.member.getAll();
      if (response) members.value = response.members;
    } finally {
      loading.value = false;
    }
  };

  return {
    members,
    loading,
    getAllMembers,
  };
});
