<script setup lang="ts">
import { IconField, InputMask, InputText } from "primevue";
import { Form } from "@primevue/forms";
</script>

<template>
  <NuxtLayout name="centered">
    <Form class="grid gap-4">
      <h3 class="text-2xl mb-4">Informe seus dados</h3>

      <FloatLabel variant="in">
        <IconField>
          <InputIcon>
            <font-awesome-icon :icon="['fas', 'user']" />
          </InputIcon>
          <InputText
            class="w-full"
            autocomplete="name"
          />
        </IconField>
        <label for="in_label">Nome</label>
      </FloatLabel>

      <FloatLabel variant="in">
        <IconField>
          <InputIcon>
            <font-awesome-icon :icon="['fas', 'phone']" />
          </InputIcon>
          <InputMask
            class="w-full"
            mask="(99) 99999-9999"
            type="tel"
            autocomplete="tel-national"
          />
        </IconField>
        <label for="in_label">Telefone</label>
      </FloatLabel>

      <Button
        class="w-full mt-5"
        disabled
      >
        Me Cadastrar
      </Button>
    </Form>
  </NuxtLayout>
</template>
