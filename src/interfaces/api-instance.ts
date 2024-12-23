import type AuthService from "@/services/auth";
import type IncomeService from "@/services/income";
import type MemberService from "@/services/member";

export interface ApiInstance {
  auth: AuthService;
  income: IncomeService;
  member: MemberService;
}
