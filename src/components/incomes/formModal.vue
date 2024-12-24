<template>
  <v-dialog
    :model-value="props.dialogShow"
    max-width="500"
    persistent
    @update:model-value="handleClose"
  >
    <v-card :title="dialogTitle" :loading="incomesStore.loadingById">
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
            v-model="amount"
            :rules="amountRules"
            label="Receita*"
            type="number"
            variant="outlined"
            required
          />
          <v-autocomplete
            v-model="members"
            :loading="membersStore.loading"
            :items="membersStore.members"
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
  incomeId: {
    type: Number || null,
    default: null,
  },
});
const membersStore = useMemberStore();
const incomesStore = useIncomesStore();

const form = ref();
const dialogTitle = ref("");
const name = ref("");
const amount = ref(0);
const members = ref();
const nameRules = ref([
  (name: string) => !!name || "Name is required",
  (name: string) =>
    (name && name.length <= 10) || "Name must be 10 characters or less",
]);
const amountRules = ref([(amount: number) => !!amount || "Amount is required"]);

watch(
  () => props.dialogShow,
  (newVal) => {
    if (newVal) {
      loadMembers();
      if (props.incomeId) {
        dialogTitle.value = "Editar renda";
        loadIncome();
      } else {
        dialogTitle.value = "Adicionar renda";
      }
    }
  }
);

const handleSave = async () => {
  const isValid = await form.value.validate();
  if (isValid.valid) {
    const payload = {
      name: name.value,
      amount: amount.value,
      id_member_fk: members.value,
    };
    if (props.incomeId) {
      await incomesStore.updateIncome(props.incomeId, payload);
    } else {
      await incomesStore.createIncome(payload);
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
  amount.value = 0;
  members.value = null;
  form.value.reset();
};

const loadMembers = async () => {
  await membersStore.getAllMembers();
};

const loadIncome = async () => {
  const income = await incomesStore.getIncomeById(props.incomeId);
  if (!income) return;

  name.value = income.name;
  amount.value = income.amount;
  members.value = income.id_member_fk;
};
</script>
