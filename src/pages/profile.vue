<template>
  <v-card>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mt-4">
        <dashboard-finance-card title="Renda Mensal">
          <dashboard-income-table />
        </dashboard-finance-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="mt-4">
        <dashboard-finance-card title="Despesas Essenciais" height="400">
          <dashboard-expense-table :expenses="essentialExpensesMock" />
        </dashboard-finance-card>
      </v-col>
    </v-row>
  </v-card>
</template>
