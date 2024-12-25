import type {
  Income,
  IncomeSimple,
  IncomesPaginated,
} from "@/interfaces/income";
import BaseService from "../base";

export default class IncomeService extends BaseService {
  private RESOURCE = "incomes/";

  async getAll(params: {
    [key: string]: string | number;
  }): Promise<IncomesPaginated | undefined> {
    const query = this.getQueryParams(params);
    return await this.request(this.RESOURCE + "?" + query, "GET");
  }

  async getById(id: number): Promise<IncomeSimple | undefined> {
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
