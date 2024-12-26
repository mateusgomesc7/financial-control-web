<template>
  <v-dialog
    :model-value="props.dialogShow"
    max-width="500"
    persistent
    @update:model-value="handleClose"
  >
    <v-card :title="dialogTitle" :loading="essentialExpensesStore.loadingById">
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nome*"
            variant="outlined"
            required
          />
          <v-text-field
            v-model="expected"
            :rules="expectedRules"
            label="Esperado*"
            type="number"
            variant="outlined"
            required
          />
          <v-autocomplete
            v-model="members"
            :loading="membersStore.loading"
            :items="membersStore.members"
            clearable
            label="Membros"
            variant="outlined"
            item-title="name"
            item-value="id"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn text="Cancelar" variant="plain" @click="handleClose" />

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
const emit = defineEmits(["update:show"]);
const props = defineProps({
  dialogShow: {
    type: Boolean,
    default: false,
  },
  essentialExpenseId: {
    type: Number || null,
    default: null,
  },
});
const membersStore = useMemberStore();
const essentialExpensesStore = useEssentialExpensesStore();

const form = ref();
const dialogTitle = ref("");
const name = ref("");
const expected = ref(0);
const members = ref();
const nameRules = ref([
  (name: string) => !!name || "Name is required",
  (name: string) =>
    (name && name.length <= 10) || "Name must be 10 characters or less",
]);
const expectedRules = ref([
  (expected: number) => !!expected || "Amount is required",
]);

watch(
  () => props.dialogShow,
  (newVal) => {
    if (newVal) {
      loadMembers();
      if (props.essentialExpenseId) {
        dialogTitle.value = "Editar despesa essencial";
        loadEssentialExpense();
      } else {
        dialogTitle.value = "Adicionar despesa essencial";
      }
    }
  }
);

const handleSave = async () => {
  const isValid = await form.value.validate();
  if (isValid.valid) {
    const payload = {
      name: name.value,
      expected: expected.value,
      id_member_fk: members.value,
    };
    if (props.essentialExpenseId) {
      await essentialExpensesStore.updateEssentialExpense(
        props.essentialExpenseId,
        payload
      );
    } else {
      await essentialExpensesStore.createEssentialExpense(payload);
    }
    handleClose();
  }
};

const handleClose = () => {
  clearForm();
  emit("update:show", false);
};

const clearForm = () => {
  name.value = "";
  expected.value = 0;
  members.value = null;
  form.value.reset();
};

const loadMembers = async () => {
  await membersStore.getAllMembers();
};

const loadEssentialExpense = async () => {
  const essentialExpense = await essentialExpensesStore.getEssentialExpenseById(
    props.essentialExpenseId
  );
  if (!essentialExpense) return;

  name.value = essentialExpense.name;
  expected.value = essentialExpense.expected;
  members.value = essentialExpense.id_member_fk;
};
</script>
