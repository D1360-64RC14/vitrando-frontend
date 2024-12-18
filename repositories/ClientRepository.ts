import type { ClientID } from "~/domain/ID";
import { Sex, type Client } from "~/domain/Person";

export class ClientRepository {
  async getMyself(id: ClientID) {
    if (id === 1) {
      return clients[0];
    }
  }
}

const clients: Client[] = [
  {
    id: 1,
    name: "Diego Garcia",
    phoneCountry: "55",
    phoneNumber: "44991013968",
    birthdate: new Date(2003, 5, 5),
    sex: Sex.MALE,
  },
];
