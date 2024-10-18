<template>
  <apexchart
    type="line"
    :options="chartOptions"
    :series="series"
    :height="props.height"
    :width="props.width"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  height: {
    type: [String, Number],
    default: "100%",
  },
  width: {
    type: [String, Number],
    default: "100%",
  },
});

const chartOptions = {
  chart: {
    id: "lineExample",
  },
  xaxis: {
    categories: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug"],
  },
};
const series = [
  {
    name: "series1",
    data: [300, 400, 350, 500, 490, 600, 700, 910],
  },
];
</script>
