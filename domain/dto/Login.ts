import type { AgentID, ClientID } from "../ID";

export interface ClientLogin {
  id: ClientID;
  phoneCountry: string;
  phoneNumber: string;
}

export interface AgentLogin extends ClientLogin {
  id: AgentID;
  email: string;
  password: string;
}
