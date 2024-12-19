<script setup lang="ts">
import { AuthRepository } from "~/repositories/AuthRepository";
import { useMyProfileStore } from "~/stores/Profile";

const authRepo = new AuthRepository();

const profileStore = useMyProfileStore();

const phone = ref("");

const isValidating = ref(false);
const isClientExistent = ref<boolean | null>(null);
const isPhoneInvalid = computed(() => phone.value.length !== 11);

const phoneErrorMessage = computed(() => {
  if (!isValidating.value) return "";

  if (isPhoneInvalid.value) return "Número inválido";
  if (isClientExistent.value !== null && !isClientExistent.value)
    return "Cliente inexistente";

  return "";
});

async function login() {
  isValidating.value = true;

  if (isPhoneInvalid.value || isClientExistent.value) return;

  const response = await authRepo.login(phone.value);
  if (!response) {
    isClientExistent.value = false;
    return;
  }

  isClientExistent.value = true;

  profileStore.login(response.accessToken.token, response.client);
  await navigateTo("/");
}
</script>

<template>
  <NuxtLayout name="centered">
    <Form
      class="grid gap-4"
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
              v-model="phone"
              :invalid="phoneErrorMessage.length > 0"
              @value-change="isValidating = false"
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
        :disabled="isPhoneInvalid"
      >
        Entrar
      </Button>
    </Form>
  </NuxtLayout>
</template>
