<template>
  <v-card min-width="300" class="pa-4">
    <v-card-title>Login</v-card-title>

    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="formData.username"
          type="text"
          placeholder="Username"
          variant="outlined"
          required
          :rules="usernameRules"
          @keydown.enter="handleLogin"
        />
        <v-text-field
          v-model="formData.password"
          placeholder="Password"
          variant="outlined"
          required
          :rules="passwordRules"
          :type="formData.showPassword ? 'text' : 'password'"
          :append-inner-icon="formData.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="formData.showPassword = !formData.showPassword"
          @keydown.enter="handleLogin"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text="Login"
        variant="tonal"
        block
        @click="handleLogin"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login-layout",
});

const authStore = useAuthStore();
const router = useRouter();

const form = ref();
const formData = reactive({
  username: "",
  password: "",
  showPassword: false,
});

const usernameRules = ref([(v: string) => !!v || "Username is required"]);
const passwordRules = ref([(v: string) => !!v || "Password is required"]);

const handleLogin = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    authStore.authenticate(formData.username, formData.password).then(() => {
      if (authStore.validateToken()) {
        router.push("/");
      }
    });
  }
};
</script>
