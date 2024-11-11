<template>
  <div class="position-relative pt-3">
    <v-select
      v-model="value"
      :items="itens"
      class="position-absolute"
      variant="underlined"
      density="compact"
      max-width="150"
      hide-details
    />
    <apexchart
      type="line"
      :options="chartOptions"
      :series="series"
      :height="props.height"
      :width="props.width"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  height: {
    type: [String, Number],
    default: "275",
  },
  width: {
    type: [String, Number],
    default: "100%",
  },
});

const itens = ["Ganho", "Pago", "Esperado"];
const value = ref("Ganho");

const chartOptions = {
  chart: {
    id: "lineExample",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: [4],
  },
  colors: ["#ECB2FF"],
  tooltip: {
    theme: "dark",
  },
  xaxis: {
    categories: [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ],
    labels: {
      style: {
        colors: "#ffffff",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#ffffff",
      },
    },
  },
};
const series = [
  {
    name: "series1",
    data: [300, 400, 350, 500, 490, 600, 700, 910, 708, 400, 123, 579],
  },
];
</script>

<style scoped>
.v-select {
  top: 0;
  right: 20px;
  z-index: 1;
}

:deep(.v-select__selection-text) {
  font-size: 12px !important;
}
</style>
