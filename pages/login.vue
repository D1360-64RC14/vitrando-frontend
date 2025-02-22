<script setup lang="ts">
import { type FormSubmitEvent, Form } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { AgentRepository } from "~/repositories/AgentRepository";
import { AuthRepository } from "~/repositories/AuthRepository";
import { StoreRepository } from "~/repositories/StoreRepository";
import { useMyProfileStore } from "~/stores/Profile";

const authRepo = new AuthRepository();
const agentRepo = new AgentRepository();
const storeRepo = new StoreRepository();

const profileStore = useMyProfileStore();

const isClientExistent = ref<boolean | null>(null);

const resolver = zodResolver(
  z.object({
    phone: z.preprocess(
      (v) => (typeof v === "string" ? v.replaceAll(/[()\- ]/g, "") : v),
      z.string().length(11, "Informe um número válido")
    ),
  })
);

const initialValues = ref({
  phone: "",
});

async function login(ev: FormSubmitEvent) {
  if (!ev.valid) return;

  const response = await authRepo.login(ev.values.phone);
  if (!response) {
    ev.errors.push("phone", "Telefone inexistente");
    return;
  }

  profileStore.login(response.accessToken.token, response.client);
  profileStore.agent = await agentRepo.getMyAgent();
  profileStore.store = await storeRepo.getMyStore();

  await navigateTo("/");
}
</script>

<template>
  <NuxtLayout name="centered">
    <Form
      #="$form"
      class="grid gap-4"
      :resolver="resolver"
      :initialValues="initialValues"
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
            />
          </IconField>
          <label for="in_label">Telefone</label>
        </FloatLabel>
        <Message
          class="mt-2"
          v-if="$form.phone?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.phone?.error?.message }}
        </Message>
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
