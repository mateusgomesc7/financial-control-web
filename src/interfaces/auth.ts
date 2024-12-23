import type { User } from "./user";

export interface Auth {
  access_token: string;
  token_type: string;
  user: User;
}
