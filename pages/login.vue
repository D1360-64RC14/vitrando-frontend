<script setup lang="ts">
import { type FormSubmitEvent, Form } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { AgentService } from "~/services/AgentService";
import { AuthService } from "~/services/AuthService";
import { StoreService } from "~/services/StoreService";
import { useMyProfileStore } from "~/stores/Profile";

const authService = new AuthService();
const agentService = new AgentService();
const storeService = new StoreService();

const profileStore = useMyProfileStore();

const apiError = ref<string | null>(null);

const resolver = zodResolver(
  z.object({
    phone: z.preprocess(
      (v) => (typeof v === "string" ? v.replaceAll(/[()\- ]/g, "") : v),
      z.string().length(11, "Informe um número válido")
    ),
  })
);

async function login(ev: FormSubmitEvent) {
  if (!ev.valid) return;

  const response = await authService.login(ev.values.phone);
  if (!response) {
    apiError.value = "Cadastro inexistente";
    return;
  }

  profileStore.login(response.accessToken.token, response.client);
  profileStore.agent = await agentService.getMyAgent();
  profileStore.store = await storeService.getMyStore();

  await navigateTo("/");
}
</script>

<template>
  <NuxtLayout name="centered">
    <Form
      #="$form"
      class="grid gap-4"
      :resolver="resolver"
      :validateOnValueUpdate="false"
      validateOnBlur
      @submit="login"
    >
      <h3 class="text-2xl mb-4">
        <AnchorBack>
          <font-awesome-icon
            :icon="['fas', 'arrow-left']"
            class="me-3 scale-75 text-primary-600"
          />
        </AnchorBack>
        <span>Entre com seus dados</span>
      </h3>

      <div>
        <FieldWithError
          #="$error"
          :sources="[$form.phone?.error?.message, apiError]"
        >
          <FloatLabel variant="in">
            <IconField>
              <InputIcon>
                <font-awesome-icon :icon="['fas', 'phone']" />
              </InputIcon>
              <InputMask
                fluid
                name="phone"
                mask="(99) 99999-9999"
                type="tel"
                autocomplete="tel-national"
                unmask
                @value-change="apiError = null"
                :invalid="$error.invalid"
              />
            </IconField>
            <label for="in_label">Telefone</label>
          </FloatLabel>
        </FieldWithError>
      </div>
      <FloatLabel
        variant="in"
        class="mt-4"
        v-if="false"
      >
        <IconField>
          <InputIcon>
            <font-awesome-icon :icon="['fas', 'at']" />
          </InputIcon>
          <InputText
            fluid
            type="email"
            autocomplete="email"
          />
        </IconField>
        <label for="in_label">Endereço de E-mail</label>
      </FloatLabel>

      <Button
        fluid
        class="mt-5"
        type="submit"
      >
        Entrar
      </Button>
    </Form>
  </NuxtLayout>
</template>
