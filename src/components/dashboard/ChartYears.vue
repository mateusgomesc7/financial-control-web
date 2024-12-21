<template>
    <v-slide-group
        v-model="yearSelected"
        show-arrows
        center-active
        mandatory
    >
    <v-slide-group-item
        v-for="n in years"
        :key="n"
        v-slot="{ isSelected, toggle }"
    >
        <v-btn
            :color="isSelected ? 'primary-50' : 'primary'"
            class="mx-2 my-0 py-1 font-weight-bold text-white"
            elevation="0"
            :size="display.mdAndUp.value ? 'large' : 'small'"
            height="35"
            @click="toggle"
        >
        {{ n }}
        </v-btn>
    </v-slide-group-item>
    </v-slide-group>
</template>

<script setup>
import { useDisplay } from "vuetify";

const display = useDisplay();
const years = ref([2021, 2022, 2023, 2024, 2025]);
const yearSelected = ref(2023);
</script>