import type {
  NonEssentialExpense,
  NonEssentialExpenseSimple,
  NonEssentialExpensesPaginated,
} from "@/interfaces/non-essential-expense";
import BaseService from "../base";

export default class NonEssentialExpenseService extends BaseService {
  private RESOURCE = "non-essential-expenses/";

  async getAll(params: {
    [key: string]: string | number;
  }): Promise<NonEssentialExpensesPaginated | undefined> {
    const query = this.getQueryParams(params);
    return await this.request(this.RESOURCE + "?" + query, "GET");
  }

  async getById(id: number): Promise<NonEssentialExpenseSimple | undefined> {
    return await this.request(this.RESOURCE + id, "GET");
  }

  async create(
    data: NonEssentialExpenseSimple
  ): Promise<NonEssentialExpense | undefined> {
    return await this.request(this.RESOURCE, "POST", data);
  }

  async update(
    id: number,
    data: NonEssentialExpenseSimple
  ): Promise<NonEssentialExpense | undefined> {
    return await this.request(this.RESOURCE + id, "PUT", data);
  }

  async delete(id: number): Promise<{ message: string } | undefined> {
    return await this.request(this.RESOURCE + id, "DELETE");
  }
}
