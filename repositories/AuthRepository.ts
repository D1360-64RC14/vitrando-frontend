import type { AccessToken } from "~/domain/Auth";
import type { ClientID } from "~/domain/ID";
import { Sex, type Client } from "~/domain/Person";

export interface LoginResponse {
  client: Client;
  accessToken: AccessToken;
}

export class AuthRepository {
  constructor() {}

  async login(phone: string): Promise<LoginResponse | null> {
    if (phone === "44991013968") {
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 12);

      return {
        client: {
          id: 1,
          name: "Diego Garcia",
          phoneCountry: "55",
          phoneNumber: "44991013968",
          birthdate: new Date(2003, 5, 5),
          sex: Sex.MALE,
        },
        accessToken: {
          expiresAt: expiration,
          token: "token not implemented",
        },
      };
    }

    return null;
  }
}
