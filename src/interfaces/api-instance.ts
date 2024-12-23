import type AuthService from "@/services/auth";
import type IncomeService from "@/services/income";

export interface ApiInstance {
  auth: AuthService;
  income: IncomeService;
}
