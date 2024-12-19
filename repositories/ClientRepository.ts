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

  async create(name: string, phone: string): Promise<Client> {
    const existent = await this.getByPhone(phone);
    if (existent) {
      throw "Número de telefone já cadastrado";
    }

    const newClient: Client = {
      id: (this.clientStore.$state.at(-1)?.id ?? 0) + 1,
      name,
      phoneCountry: "55",
      phoneNumber: phone,
      sex: Sex.UNDEFINED,
    };

    this.clientStore.$state.push(newClient);
    return newClient;
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
  persist: true,
});
