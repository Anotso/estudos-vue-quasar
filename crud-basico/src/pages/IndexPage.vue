<template>
  <q-page padding>
    <q-table
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h5">Artigos</span>
        <q-space/>
        <q-btn color="primary" label="Novo" :to="{
          name: 'formPost'
        }" />
      </template>
       <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="handleEditPost(props.row.id)"/>
          <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)"/>
        </q-td>
       </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from '../services/post'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list, remove } = postsService()
    const router = useRouter()

    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'title', field: 'title', label: 'Título', align: 'left' },
      { name: 'author', field: 'author', label: 'Autor', align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
    ]

    const $q = useQuasar()

    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        console.error(error)
      }
    }

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Remover',
          message: 'Deseja excluir o registro?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({
            message: 'Registro apagado com sucesso!',
            icon: 'check',
            color: 'positive'
          })
          await getPosts()
        })
      } catch (error) {
        $q.notify({
          message: 'Erro ao tentar excluir o registro.',
          icon: 'times',
          color: 'negative'
        })
      }
    }

    const handleEditPost = (id) => {
      router.push({ name: 'formPost', params: { id } })
    }

    onMounted(() => {
      getPosts()
    })

    return {
      posts,
      columns,
      handleDeletePost,
      handleEditPost
    }
  }
})
</script>
