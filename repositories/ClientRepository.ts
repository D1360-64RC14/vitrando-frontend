import type { ClientID } from "~/domain/ID";
import { Sex, type Client } from "~/domain/Person";

export class ClientRepository {
  private readonly clientStore = useClientStore();

  async get(id: ClientID): Promise<Client | null> {
    const client = this.clientStore.$state.find((c) => c.id === id);
    return client ?? null;
  }

  async getByPhone(phone: string): Promise<Client | null> {
    const client = this.clientStore.$state.find((c) => c.phoneNumber === phone);
    return client ?? null;
  }
}

const useClientStore = defineStore("db_client", {
  state: (): Client[] => [
    {
      id: 1,
      name: "Diego Garcia",
      phoneCountry: "55",
      phoneNumber: "44991013968",
      birthdate: new Date(2003, 5, 5),
      sex: Sex.MALE,
    },
  ],
});
