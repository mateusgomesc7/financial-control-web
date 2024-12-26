import { $fetch, type FetchOptions } from "ofetch";
import type { ApiInstance } from "@/interfaces/api-instance";
import IncomeService from "@/services/income";
import AuthService from "@/services/auth";
import MemberService from "@/services/member";
import EssentialExpenseService from "@/services/essential-expense";
import NonEssentialExpenseService from "@/services/non-essential-expense";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  // const { $i18n, $router } = useNuxtApp();

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseUrl,
    onRequest({ options }) {
      // if ($router.currentRoute.value.path === "/login") {
      //   return;
      // }

      // if (!useAuthStore().validateToken()) {
      //   $router.push("/login");
      //   throw new Error($i18n.t("utils.token_error"));
      // }

      const token = useAuthStore().token;
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    },
  };

  const apiFecther = $fetch.create(fetchOptions);

  const services: ApiInstance = {
    auth: new AuthService(apiFecther),
    income: new IncomeService(apiFecther),
    member: new MemberService(apiFecther),
    essentialExpense: new EssentialExpenseService(apiFecther),
    nonEssentialExpense: new NonEssentialExpenseService(apiFecther),
  };

  return {
    provide: {
      api: services,
    },
  };
});
