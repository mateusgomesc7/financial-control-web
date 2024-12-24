import type { Member } from "@/interfaces/members";
import BaseService from "../base";

export default class MemberService extends BaseService {
  private RESOURCE = "members/";

  async getAll(): Promise<{ members: Member[] } | undefined> {
    return await this.request(this.RESOURCE, "GET");
  }
}
