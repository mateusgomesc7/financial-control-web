<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-select
          v-model="model"
          :items="dates"
          variant="solo"
          color="primary"
          bg-color="secondary"
          class="d-inline-block padding-select"
          menu-icon="mdi-chevron-down"
          flat
          hide-details
        >
          <template #selection="{ item }">
            <div>
              <div class="text-primary text-caption">2024</div>
              <div class="text-primary text-h4 font-weight-bold">
                {{ item.title }}
              </div>
            </div>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card class="bg-primary" :height="350" width="100%" />
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-column ga-5">
          <v-card class="bg-info" :height="103" width="100%" />
          <v-card class="bg-info" :height="103" width="100%" />
          <v-card class="bg-info" :height="103" width="100%" />
        </div>
      </v-col>
      <v-col cols="4">
        <v-card class="bg-danger" :height="350" width="100%" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="bg-danger" :height="350" width="100%" />
      </v-col>
      <v-col>
        <v-card class="bg-danger" :height="350" width="100%" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const model: Ref<string> = ref("October");
const dates: Ref<string[]> = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);
</script>

<style scoped>
:deep(.v-select__selection-text) {
  font-size: 28px;
}

.padding-select :deep(.v-field__input) {
  padding-bottom: 0px;
  padding-left: 4px;
}
</style>
