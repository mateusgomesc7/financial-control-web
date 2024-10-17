<template>
  <v-card class="card-container" width="100%" height="350">
    <v-card-item>
      <v-card-title
        class="custom-title bg-primary font-weight-bold elevation-2 rounded-lg px-3 py-0"
      >
        {{ props.title }}
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.card-container {
  position: relative;
  overflow: visible;
}

.custom-title {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
