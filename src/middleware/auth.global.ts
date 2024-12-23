import { useAuthStore } from "@/stores/auth";
// import { useSnackbarStore } from "~/stores/snackbar";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  // const snackbarStore = useSnackbarStore();
  // const { $i18n } = useNuxtApp();

  if (to.path !== "/login") {
    if (!authStore.token) {
      return navigateTo("/login");
    }

    if (!authStore.validateToken()) {
      authStore.disauthenticate();
      // snackbarStore.showSnackbar("error", $i18n.t("utils.token_error"));
      return navigateTo("/login");
    }
  } else {
    if (authStore.validateToken()) {
      return navigateTo("/");
    }
  }
});
