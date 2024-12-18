import type { AgentID, ClientID } from "./ID";

export enum Sex {
  UNDEFINED = " ",
  FEMALE = "F",
  MALE = "M",
}

export interface Person {
  name: string;
  phoneCountry: string;
  phoneNumber: string;
  birthdate?: Date;
  sex: Sex;
}

export interface Client extends Person {
  id: ClientID;
}

export interface Agent extends Person {
  id: AgentID;

  email: string;
  cpf: string;
}
