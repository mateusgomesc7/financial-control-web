<template>
  <v-dialog :model-value="props.dialogShow" max-width="325" persistent>
    <v-card :title="props.title">
      <template #prepend>
        <v-icon
          size="x-large"
          :color="preference.iconColor"
          :icon="preference.icon"
        />
      </template>
      <v-card-text> {{ props.question }} </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn width="100" variant="outlined" @click="handleNoClick">
          Não
        </v-btn>
        <v-btn width="100" variant="outlined" @click="handleYesClick">
          Sim
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:show", "yes"]);
const props = defineProps({
  dialogShow: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as () => "error" | "warning" | "info",
    required: true,
    default: "warning",
  },
  title: {
    type: String,
    default: "",
  },
  question: {
    type: String,
    default: "",
  },
});

const preferences = {
  error: {
    icon: "mdi-alert-circle",
    iconColor: "red",
  },
  warning: {
    icon: "mdi-alert",
    iconColor: "orange",
  },
  info: {
    icon: "mdi-information",
    iconColor: "blue",
  },
};

const preference = computed(() => preferences[props.type]);

const handleNoClick = () => {
  emit("update:show", false);
};

const handleYesClick = () => {
  emit("update:show", false);
  emit("yes");
};
</script>
