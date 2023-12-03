<template>
  <MyHeader />
  <main style="margin-top: 58px">
    <div class="container pt-4">
      <div class="row">
        <div class="col-12">
          <h3>Preview Quiz</h3>
          <div class="card">
            <div class="card-header">
              <router-link to="/quiz" class="btn btn-primary float-end">Back</router-link>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <div class="row">
                  <label for="exampleFormControlTextarea1" class="form-label">Deskripsi</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="quiz.description"
                    disabled
                  ></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Waktu Mulai</label>
                    <input type="text" class="form-control" :value="startDate" disabled />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Waktu Selesai</label>
                    <input type="text" class="form-control" :value="endDate" disabled />
                  </div>
                </div>
              </div>

              <div v-for="(question, index) in quiz.questions" :key="question.id" class="mb-3">
                <p>{{ `${index + 1}. ${question.question}` }}</p>
                <div
                  class="form-check form-check-inline"
                  v-for="answer in question.answers"
                  :key="answer.id"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="'inlineRadioOptions-' + question.id"
                    :value="answer.id"
                    :checked="answer.is_correct"
                    disabled
                  />
                  <label class="form-check-label" for="inlineRadio1">{{ answer.answer }}</label>
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
import { defineComponent, ref, type Ref } from 'vue'
import moment from 'moment'
import MyHeader from '../../components/LayoutHeader.vue'
import { useAuthStore } from '@/stores/auth'

type QuizDetail = {
  description: string
  start: string
  end: string
  questions: Array<{
    id: string
    question: string
    answers: Array<{
      id: string
      answer: string
      is_correct: boolean
    }>
  }>
}
export default defineComponent({
  components: {
    MyHeader
  },
  setup() {
    const quiz: Ref<QuizDetail> = ref({
      description: '',
      start: '',
      end: '',
      questions: []
    })

    const store = useAuthStore()

    return { quiz, store }
  },
  computed: {
    currentParams() {
      return this.$route.params.id
    },
    startDate() {
      return moment(this.quiz.start).format('YYYY-MM-DD HH:mm:ss')
    },
    endDate() {
      return moment(this.quiz.end).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  async created() {
    const response = await this.store.baseRequest({
      path: '/api/quiz/' + this.currentParams,
      method: 'GET'
    })
    const quiz = response.data.data as QuizDetail
    this.quiz = quiz
  }
})
</script>
