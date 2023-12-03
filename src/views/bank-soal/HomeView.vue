<template>
  <MyHeader />
  <main style="margin-top: 58px">
    <div class="container pt-4">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h3 class="text-center">Bank Soal</h3>
            <div class="text-end mb-3">
              <router-link class="btn btn-primary" to="/create">Buat Soal</router-link>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Soal</th>
                        <th scope="col">Kesulitan</th>
                        <th scope="col">Topic</th>
                        <th scope="col">Tanggal Dibuat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="soal in soals" :key="soal.id">
                        <td>{{ soal.question }}</td>
                        <td>{{ diffString(soal.difficulty) }}</td>
                        <td>{{ `${soal.topics.map((topic) => topic)}, ` }}</td>
                        <td>{{ soal.created_at.split('T')[0] }}</td>
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
import { useAuthStore } from '@/stores/auth'
import { ref, defineComponent, type Ref } from 'vue'
import MyHeader from '@/components/LayoutHeader.vue'

type SoalList = Array<{
  id: string
  question: string
  difficulty: number
  created_at: string
  updated_at: string
  topics: Array<string>
}>
export default defineComponent({
  components: {
    MyHeader
  },
  setup() {
    const soals: Ref<SoalList> = ref([])
    const authStore = useAuthStore()
    return { soals, authStore }
  },
  async created() {
    const response = await this.authStore.baseRequest({
      path: '/api/bank-soal',
      method: 'GET'
    })

    const soals = response.data.data as SoalList
    this.soals = soals
  },
  methods: {
    diffString(lvl: number): string {
      let diffStr = ''
      if (lvl == 1) {
        diffStr = 'Mudah Sekali'
      } else if (lvl == 2) {
        diffStr = 'Mudah'
      } else if (lvl == 3) {
        diffStr = 'Normal'
      } else if (lvl == 4) {
        diffStr = 'Sulit'
      } else if (lvl == 5) {
        diffStr = 'Sangat Sulit'
      }
      return diffStr
    }
  }
})
</script>
