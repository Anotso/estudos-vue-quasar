<template>
  <q-page padding>
    <p class="text-body1">Obrigado por registrar!</p>
    <p class="text-body1">
      Por favor, para terminar o processo de cadastro confirme a ação usando o link enviado para <strong>{{ $route.query.email }}</strong>.
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
