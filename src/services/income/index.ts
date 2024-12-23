import type { Income } from "@/interfaces/income";
import BaseService from "../base";

export default class IncomeService extends BaseService {
  private RESOURCE = "incomes/";

  async getAll(): Promise<{ incomes: Income[] } | undefined> {
    return await this.request(this.RESOURCE, "GET");
  }
}
