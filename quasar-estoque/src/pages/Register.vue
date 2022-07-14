<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent='handleRegister'>
      <p class="col-12 text-h5 text-center">Cadastre-se</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nome"
          v-model="form.name"
        />
        <q-input
          label="E-mail"
          v-model="form.email"
        />
        <q-input
          label="Senha"
          v-model="form.password"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Cadastrar"
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageRegister',

  setup () {
    const router = useRouter()
    const { register } = useAuthUser()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        router.push({
          name: 'email-confirmation',
          query: {
            email: form.value.email
          }
        })
      } catch (error) {
        alert(error)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
