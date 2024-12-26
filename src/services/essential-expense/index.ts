import type {
  EssentialExpense,
  EssentialExpenseSimple,
  EssentialExpensesPaginated,
} from "@/interfaces/essential-expense";
import BaseService from "../base";

export default class EssentialExpenseService extends BaseService {
  private RESOURCE = "essential-expenses/";

  async getAll(params: {
    [key: string]: string | number;
  }): Promise<EssentialExpensesPaginated | undefined> {
    const query = this.getQueryParams(params);
    return await this.request(this.RESOURCE + "?" + query, "GET");
  }

  async getById(id: number): Promise<EssentialExpenseSimple | undefined> {
    return await this.request(this.RESOURCE + id, "GET");
  }

  async create(
    data: EssentialExpenseSimple
  ): Promise<EssentialExpense | undefined> {
    return await this.request(this.RESOURCE, "POST", data);
  }

  async update(
    id: number,
    data: EssentialExpenseSimple
  ): Promise<EssentialExpense | undefined> {
    return await this.request(this.RESOURCE + id, "PUT", data);
  }

  async delete(id: number): Promise<{ message: string } | undefined> {
    return await this.request(this.RESOURCE + id, "DELETE");
  }
}
