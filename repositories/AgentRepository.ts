import type { AgentID, ClientID } from "~/domain/ID";
import type { Agent } from "~/domain/Person";
import { ClientRepository } from "./ClientRepository";

interface beAgent {
  id: AgentID;
  email: string;
  cpf: string;
}

export class AgentRepository {
  private readonly agentStore = useAgentStore();
  private readonly profileStore = useMyProfileStore();

  private readonly clientRepo = new ClientRepository();

  constructor() {}

  async get(clientID: ClientID): Promise<Agent | null> {
    const client = await this.clientRepo.get(clientID);
    if (!client) return null;

    const agent = this.agentStore.$state.find((a) => a.id === client.id);
    if (!agent) return null;

    return {
      ...client,
      ...agent,
    };
  }

  async getMyAgent(): Promise<Agent | null> {
    console.assert(
      this.profileStore.isLoggedIn,
      "O cliente precisa estar logado para obter agente"
    );

    const agent = await this.get(this.profileStore.client!.id);

    return agent ?? null;
  }

  async create(clientID: ClientID, email: string, cpf: string): Promise<Agent> {
    const client = await this.clientRepo.get(clientID);
    if (!client) throw "Cliente inexistente";

    const newAgent: beAgent = {
      id: clientID,
      cpf,
      email,
    };

    this.agentStore.$state.push(newAgent);

    return {
      ...client,
      ...newAgent,
    };
  }
}

const useAgentStore = defineStore("db_agent", {
  state: (): beAgent[] => [],
  persist: true,
});
