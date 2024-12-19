<script setup lang="ts">
import { IconField, InputMask, InputText } from "primevue";
import { Form } from "@primevue/forms";
import {
  AuthRepository,
  type LoginResponse,
} from "~/repositories/AuthRepository";
import { AgentRepository } from "~/repositories/AgentRepository";
import { StoreRepository } from "~/repositories/StoreRepository";

const authRepo = new AuthRepository();
const agentRepo = new AgentRepository();
const storeRepo = new StoreRepository();

const profileStore = useMyProfileStore();

const name = ref("");
const phone = ref("");

const isValidating = ref(false);
const isPhoneAlreadyExistent = ref<boolean | null>();

const isNameTooShort = computed(() => name.value.length < 3);
const isNameTooBig = computed(() => name.value.length > 100);
const isPhoneInvalid = computed(() => phone.value.length !== 11);

const nameErrorMessage = computed(() => {
  if (!isValidating.value) return "";

  name.value = name.value.trim();
  if (isNameTooShort.value) return "Nome deve ter mais que 3 caracteres";
  if (isNameTooBig.value) return "Nome deve ter menos que 3 caracteres";

  return "";
});

const phoneErrorMessage = computed(() => {
  if (!isValidating.value) return "";

  if (isPhoneInvalid.value) return "Número inválido";
  if (isPhoneAlreadyExistent.value) return "Número de telefone já existente";

  return "";
});

async function signin() {
  isValidating.value = true;
  isPhoneAlreadyExistent.value = null;

  if (
    isNameTooShort.value ||
    isNameTooBig.value ||
    isPhoneInvalid.value ||
    isPhoneAlreadyExistent.value
  )
    return;

  let response: LoginResponse;

  try {
    response = await authRepo.signin(name.value, phone.value);
  } catch {
    isPhoneAlreadyExistent.value = true;
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
      class="grid gap-4"
      @submit="signin"
    >
      <h3 class="text-2xl mb-4">
        <AnchorBack>
          <font-awesome-icon
            :icon="['fas', 'arrow-left']"
            class="me-3 scale-75 text-primary-600"
          />
        </AnchorBack>
        <span>Informe seus dados</span>
      </h3>

      <div>
        <FloatLabel variant="in">
          <IconField>
            <InputIcon>
              <font-awesome-icon :icon="['fas', 'user']" />
            </InputIcon>
            <InputText
              fluid
              name="name"
              autocomplete="name"
              v-model="name"
              :invalid="nameErrorMessage.length > 0"
              @input="isValidating = false"
            />
          </IconField>
          <label for="in_label">Nome</label>
        </FloatLabel>
        <Message
          class="mt-2"
          v-if="nameErrorMessage.length > 0"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ nameErrorMessage }}
        </Message>
      </div>

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
              v-model="phone"
              :invalid="phoneErrorMessage.length > 0"
              @value-change="
                isValidating = false;
                isPhoneAlreadyExistent = null;
              "
            />
          </IconField>
          <label for="in_label">Telefone</label>
        </FloatLabel>
        <Message
          class="mt-2"
          v-if="phoneErrorMessage.length > 0"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ phoneErrorMessage }}
        </Message>
      </div>

      <Button
        class="mt-5"
        fluid
        type="submit"
      >
        Me Cadastrar
      </Button>
    </Form>
  </NuxtLayout>
</template>
