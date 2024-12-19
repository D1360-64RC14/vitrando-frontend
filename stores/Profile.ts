import { defineStore } from "pinia";
import type { Agent, Client } from "~/domain/Person";
import type { Store } from "~/domain/Store";

export const useMyProfileStore = defineStore("my_profile", {
  state: () => ({
    token: <string | null>null,
    client: <Client | null>null,
    agent: <Agent | null>null,
    store: <Store | null>null,
  }),
  getters: {
    isLoggedIn: (self) => self.client !== null,
    haveAgent: (self) => self.agent !== null,
    haveStore: (self) => self.store !== null,
  },
  actions: {
    logout() {
      this.token = null;
      this.client = null;
      this.agent = null;
      this.store = null;
    },
    login(token: string, client: Client) {
      this.token = token;
      this.client = client;
    },
  },
  persist: true,
});
