import type { AccessToken } from "~/domain/Auth";
import { ClientRepository } from "./ClientRepository";
import type { Client } from "~/domain/Person";

export interface LoginResponse {
  client: Client;
  accessToken: AccessToken;
}

export class AuthRepository {
  private readonly clientRepo = new ClientRepository();

  constructor() {}

  async login(phone: string): Promise<LoginResponse | null> {
    const client = await this.clientRepo.getByPhone(phone);
    if (!client) return null;

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 12);

    return {
      client: client,
      accessToken: {
        expiresAt: expiration,
        token: "token not implemented",
      },
    };
  }
}
