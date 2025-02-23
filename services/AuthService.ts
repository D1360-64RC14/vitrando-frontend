import type { AccessToken } from "~/domain/Auth";
import { ClientService } from "./ClientService";
import type { Client } from "~/domain/Person";

export interface LoginResponse {
  client: Client;
  accessToken: AccessToken;
}

export class AuthService {
  private readonly clientService = new ClientService();

  constructor() {}

  async login(phone: string): Promise<LoginResponse | null> {
    const client = await this.clientService.getByPhone(phone);
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

  async signin(name: string, phone: string): Promise<LoginResponse> {
    await this.clientService.create(name, phone);
    return (await this.login(phone))!;
  }
}
