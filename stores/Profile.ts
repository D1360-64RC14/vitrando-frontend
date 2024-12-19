import { defineStore } from "pinia";
import type { Client } from "~/domain/Person";

export const useMyProfileStore = defineStore("my_profile", {
  state: () => ({
    token: <string | undefined>undefined,
    client: <Client | undefined>undefined,
  }),
  getters: {
    isLoggedIn: (self) => self.client !== undefined,
  },
  actions: {
    logout() {
      this.token = undefined;
      this.client = undefined;
    },
    login(token: string, client: Client) {
      this.token = token;
      this.client = client;
    },
  },
  persist: true,
});
