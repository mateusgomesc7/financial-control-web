import type { Auth } from "@/interfaces/auth";
import BaseService from "../base";

export default class AuthService extends BaseService {
  private RESOURCE: string = "auth/";

  async authenticate(data: Record<string, string>): Promise<Auth | undefined> {
    const body = new URLSearchParams(data).toString();
    return await this.request(this.RESOURCE + "token", "POST", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}
