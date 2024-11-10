import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: "#8724FF",
            "primary-50": "#ECB2FF",
            secondary: "#D9D9D9",
            accent: "#4DA0FF",
            "accent-50": "#70AEF6",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FFC107",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
