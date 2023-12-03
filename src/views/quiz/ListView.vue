<template>
  <MyHeader />
  <main style="margin-top: 58px">
    <div class="container pt-4">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h3 class="text-center">Quiz</h3>
            <div class="text-end mb-3">
              <router-link class="btn btn-primary" to="/quiz/create">Buat Quiz</router-link>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Deskripsi</th>
                        <th scope="col">Waktu Mulai</th>
                        <th scope="col">Waktu Selesai</th>
                        <th scope="col">Dibuat Oleh</th>
                        <th scope="col">Waktu Dibuat</th>
                        <th scope="col">Jumlah Soal</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="quiz in quizes" :key="quiz.id">
                        <td>{{ quiz.description.substring(0, 100) }}</td>
                        <td>{{ formatDate(quiz.start) }}</td>
                        <td>{{ formatDate(quiz.end) }}</td>
                        <td>{{ quiz.name_created }}</td>
                        <td>{{ quiz.created_at.split('T')[0] }}</td>
                        <td>{{ quiz.qty }}</td>
                        <td>
                          <router-link :to="'/quiz/' + quiz.id" class="btn btn-sm btn-primary"
                            >Buka</router-link
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { ref, defineComponent, type Ref } from 'vue'
import MyHeader from '../../components/LayoutHeader.vue'
import moment from 'moment'
import { useAuthStore } from '@/stores/auth'

type QuizList = Array<{
  id: string
  description: string
  start: string
  end: string
  created_by: number
  created_at: string
  updated_at: string
  name_created: string
  qty: number
}>
export default defineComponent({
  components: {
    MyHeader
  },
  setup() {
    const quizes: Ref<QuizList> = ref([])
    const store = useAuthStore()
    return { quizes, store }
  },
  async created() {
    const response = await this.store.baseRequest({
      path: '/api/quiz',
      method: 'GET'
    })
    const quizes = response.data.data as QuizList
    this.quizes = quizes
  },
  methods: {
    formatDate(date: string): string {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
})
</script>
