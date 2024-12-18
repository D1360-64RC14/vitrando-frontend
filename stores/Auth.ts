import type { Client } from "~/domain/Person";

export const useMyAuthStore = reactive<{
  token?: string;
  client?: Client;
}>({});
