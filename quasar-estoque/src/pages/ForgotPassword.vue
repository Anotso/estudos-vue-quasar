<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent='handleForgotPassword'>
      <p class="col-12 text-h5 text-center">Reiniciar a senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="E-mail"
          v-model="email"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Enviar"
            class="full-width"
            color="primary"
            outline
            rounded
            type="submit"
          />
          <q-btn
            label="Voltar"
            class="full-width"
            color="dark"
            flat
            rounded
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
// import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageForgotPassword',

  setup () {
    const { sendPasswordRestEmail } = useAuthUser()
    const email = ref('')

    const handleForgotPassword = async () => {
      // console.log(email.value)
      await sendPasswordRestEmail(email.value)
      alert(`Enviado e-mail de recuperação de senha para: ${email.value}`)
    }

    return {
      email,
      handleForgotPassword
    }
  }
})
</script>
