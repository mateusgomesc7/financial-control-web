import { jwtDecode, type JwtPayload } from "jwt-decode";
import type { Auth } from "@/interfaces/auth";

export const useAuthStore = defineStore(
  "financial_control_auth",
  () => {
    const { $api } = useNuxtApp();
    const userStore = useUserStore();

    const token = ref<string | null>(null);

    const authenticate = async (
      username: string,
      password: string
    ): Promise<Auth | undefined> => {
      try {
        const payload = {
          grant_type: "password",
          username: username,
          password: password,
        };

        const response: Auth | undefined = await $api.auth.authenticate(
          payload
        );
        if (response) {
          token.value = response.access_token;
          userStore.currentUser = response.user;
        }
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const disauthenticate = () => {
      token.value = null;
      userStore.currentUser = null;
    };

    const validateToken = (): boolean => {
      if (!token.value) return false;
      try {
        const decoded = jwtDecode<JwtPayload>(token.value);
        const currentTime = Date.now() / 1000;
        return decoded.exp !== undefined && decoded.exp > currentTime;
      } catch (error) {
        return false;
      }
    };

    return {
      token,
      authenticate,
      disauthenticate,
      validateToken,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
    share: {
      enable: true,
    },
  }
);
