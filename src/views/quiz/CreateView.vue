<template>
  <MyHeader />
  <main style="margin-top: 58px">
    <div class="container pt-4">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h3>Create Quiz</h3>
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="submitSoal()">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Deskripsi</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      v-model="input.description"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Waktu Mulai</label>
                    <input type="datetime-local" class="form-control" v-model="input.start" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Waktu Selesai</label>
                    <input type="datetime-local" class="form-control" v-model="input.end" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Jawaban</label>
                    <div v-for="(quiz, index) in input.detail" :key="index">
                      <div class="d-flex justify-content-between">
                        <div class="mb-3">
                          <label for="customRange2" class="form-label">Tingkat Kesulitan</label>
                          <input
                            type="range"
                            class="form-range"
                            min="1"
                            max="5"
                            v-model="quiz.difficulty"
                            required
                          />
                          <p>{{ diffString(quiz.difficulty) }}</p>
                        </div>

                        <div class="mb-3">
                          <label class="form-label">Topik</label>
                          <select class="form-select" v-model="quiz.topic_id">
                            <option :value="topic.id" v-for="topic in topics" :key="topic.id">
                              {{ topic.name }}
                            </option>
                          </select>
                        </div>

                        <div class="mb-3">
                          <label class="form-label">Jumlah Soal</label>
                          <input class="form-control" type="number" min="1" v-model="quiz.qty" />
                        </div>

                        <div>
                          <div style="flex: 1">
                            <a
                              class="btn btn-xs btn-success"
                              @click="
                                () => input.detail.push({ topic_id: 1, difficulty: 3, qty: 1 })
                              "
                            >
                              +
                            </a>
                            <a
                              v-if="index == 0"
                              class="btn btn-xs btn-danger"
                              @click="() => input.detail.pop()"
                            >
                              -
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button class="btn btn-primary" type="submit">Submit</button>
                      <RouterLink class="btn btn-light" to="/quiz">Cancel</RouterLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import { RouterLink } from 'vue-router'

import MyHeader from '@/components/LayoutHeader.vue'
import { useAuthStore } from '@/stores/auth'

type TopicList = Array<{ id: number; name: string }>

export default defineComponent({
  setup() {
    const input = ref({
      start: '',
      end: '',
      description: '',
      detail: [
        {
          difficulty: 3,
          topic_id: 1,
          qty: 1
        }
      ]
    })
    const topics: Ref<TopicList> = ref([])
    const store = useAuthStore()
    return { input, topics, store }
  },
  methods: {
    diffString(difficulty: number): string {
      let diffStr = ''
      if (difficulty == 1) {
        diffStr = 'Mudah Sekali'
      } else if (difficulty == 2) {
        diffStr = 'Mudah'
      } else if (difficulty == 3) {
        diffStr = 'Normal'
      } else if (difficulty == 4) {
        diffStr = 'Sulit'
      } else if (difficulty == 5) {
        diffStr = 'Sangat Sulit'
      }
      return diffStr
    },
    async submitSoal() {
      const response = await this.store.baseRequest({
        path: '/api/quiz',
        method: 'POST',
        data: this.input
      })
      if (response.status == 201) {
        this.$router.push({ path: '/quiz' })
      }
    }
  },
  async created() {
    const response = await this.store.baseRequest({
      path: '/api/bank-soal/topic',
      method: 'GET'
    })
    const topics = response.data.data as TopicList
    this.topics = topics
  },
  components: { RouterLink, MyHeader }
})
</script>
