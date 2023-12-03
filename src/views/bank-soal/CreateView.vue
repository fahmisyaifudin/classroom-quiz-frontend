<template>
  <MyHeader />
  <main style="margin-top: 58px">
    <div class="container pt-4">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h3>Create Soal</h3>
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="submitSoal()">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Soal</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      v-model="input.question"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="customRange2" class="form-label">Tingkat Kesulitan</label>
                    <input
                      type="range"
                      class="form-range"
                      min="1"
                      max="5"
                      v-model="input.difficulty"
                      required
                    />
                    <p>{{ diffString }}</p>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Topik</label>
                    <select class="form-select" multiple v-model="input.topics">
                      <option :value="topic.id" v-for="topic in topics" :key="topic.id">
                        {{ topic.name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Jawaban</label>
                    <div v-for="(answer, index) in input.answers" :key="index">
                      <div class="d-flex justify-content-between">
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          v-model="input.answers[index].answer"
                          style="flex: 4"
                        ></textarea>
                        <div class="form-check mx-2" style="flex: 2">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :checked="input.answers[index].is_correct"
                            @change="
                              () =>
                                (input.answers[index].is_correct = !input.answers[index].is_correct)
                            "
                          />
                          <label class="form-check-label">Jawaban benar</label>
                        </div>
                        <div style="flex: 1">
                          <a
                            class="btn btn-xs btn-success"
                            @click="() => input.answers.push({ answer: '', is_correct: false })"
                          >
                            +
                          </a>
                          <a
                            v-if="index == 0"
                            class="btn btn-xs btn-danger"
                            @click="() => input.answers.pop()"
                          >
                            -
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button class="btn btn-primary" type="submit">Submit</button>
                      <RouterLink class="btn btn-light" to="/">Cancel</RouterLink>
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
import { useAuthStore } from '@/stores/auth'
import { defineComponent, ref, type Ref } from 'vue'
import { RouterLink } from 'vue-router'

import MyHeader from '@/components/LayoutHeader.vue'

type TopicList = Array<{ id: number; name: string }>

export default defineComponent({
  setup() {
    const input = ref({
      difficulty: 3,
      topics: [],
      question: '',
      answers: [{ answer: '', is_correct: true }]
    })
    const authStore = useAuthStore()
    const topics: Ref<TopicList> = ref([])
    return { input, topics, authStore }
  },
  computed: {
    diffString(): string {
      let diffStr = ''
      if (this.input.difficulty == 1) {
        diffStr = 'Mudah Sekali'
      } else if (this.input.difficulty == 2) {
        diffStr = 'Mudah'
      } else if (this.input.difficulty == 3) {
        diffStr = 'Normal'
      } else if (this.input.difficulty == 4) {
        diffStr = 'Sulit'
      } else if (this.input.difficulty == 5) {
        diffStr = 'Sangat Sulit'
      }
      return diffStr
    }
  },
  methods: {
    async submitSoal() {
      const response = await this.authStore.baseRequest({
        path: '/api/bank-soal',
        method: 'POST',
        data: this.input
      })

      if (response.status == 201) {
        this.$router.push({ path: '/' })
      }
    }
  },
  async created() {
    const response = await this.authStore.baseRequest({
      path: '/api/bank-soal/topic',
      method: 'GET'
    })

    const topics = response.data.data as TopicList
    this.topics = topics
  },
  components: { RouterLink, MyHeader }
})
</script>
