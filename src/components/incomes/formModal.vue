<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card :title="dialogTitle">
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Nome"
            required
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn text="Cancelar" variant="plain" @click="handleCancel" />

        <v-btn
          color="primary"
          text="Salvar"
          variant="tonal"
          @click="handleSave"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const emits = defineEmits(["update:modelValue", "save"]);
const props = defineProps({
  dialogShow: {
    type: Boolean,
    default: false,
  },
  incomeId: {
    type: Number || null,
    default: null,
  },
});

const form = ref();
const dialogTitle = ref("");
const name = ref("");
const nameRules = ref([
  (name: string) => !!name || "Name is required",
  (name: string) =>
    (name && name.length <= 10) || "Name must be 10 characters or less",
]);

const dialog = computed({
  get: () => props.dialogShow,
  set: (value) => {
    emits("update:modelValue", value);
  },
});

watch(
  () => props.incomeId,
  (newVal) => {
    console.log(newVal);
    if (newVal) {
      dialogTitle.value = "Edit income";
      name.value = "Income name";
    } else {
      dialogTitle.value = "Add income";
      name.value = "";
    }
  },
  { immediate: true }
);

const handleSave = async () => {
  const isValid = await form.value.validate();
  if (isValid.valid) {
    emits("save", name.value);
    dialog.value = false;
  }
};

const handleCancel = () => {
  dialog.value = false;
};
</script>
