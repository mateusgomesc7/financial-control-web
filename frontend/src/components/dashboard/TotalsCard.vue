<template>
  <v-card
    class="bg-accent-50 rounded-lg position-static"
    height="100%"
    width="100%"
  >
    <v-card-title class="font-weight-bold text-center bg-accent rounded-lg">
      {{ props.title }}
    </v-card-title>
    <v-card-text class="d-flex justify-center text-h6 font-weight-bold py-2">
      {{ props.value }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.v-card-title {
  font-size: 1.18rem !important;
}
</style>
