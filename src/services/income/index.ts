import type { Income, IncomeSimple } from "@/interfaces/income";
import BaseService from "../base";

export default class IncomeService extends BaseService {
  private RESOURCE = "incomes/";

  async getAll(): Promise<{ incomes: Income[] } | undefined> {
    return await this.request(this.RESOURCE, "GET");
  }

  async getById(id: number): Promise<Income | undefined> {
    return await this.request(this.RESOURCE + id, "GET");
  }

  async create(data: IncomeSimple): Promise<Income | undefined> {
    return await this.request(this.RESOURCE, "POST", data);
  }

  async update(id: number, data: IncomeSimple): Promise<Income | undefined> {
    return await this.request(this.RESOURCE + id, "PUT", data);
  }

  async delete(id: number): Promise<{ message: string } | undefined> {
    return await this.request(this.RESOURCE + id, "DELETE");
  }
}
