<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent='handlerLogin'>
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="E-mail"
          v-model="form.email"
        />
        <q-input
          label="Senha"
          v-model="form.password"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            class="full-width"
            color="primary"
            outline
            rounded
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-md">
          <q-btn
            label="Cadastre-se"
            class="full-width"
            color="primary"
            flat
            to="/register"
            size="sm"
          />
          <q-btn
            label="Esqueci a senha"
            class="full-width"
            color="primary"
            flat
            :to="{ name: 'forgot-password'}"
            size="sm"
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
  name: 'PageLogin',

  setup () {
    const router = useRouter()
    const { login } = useAuthUser()

    const form = ref({
      email: '',
      password: ''
    })

    const handlerLogin = async () => {
      try {
        await login(form.value)
        router.push({ name: 'me' })
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      form,
      handlerLogin
    }
  }
})
</script>
