<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Login</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="loginAction()">
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter email"
                  v-model="email"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter password"
                  v-model="password"
                />
              </div>
              <div class="alert alert-danger" v-if="msg.length > 0">{{ msg }}</div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth'
import { defineComponent, ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import firebaseApp from '../libs/firebase'

const auth = getAuth(firebaseApp)

export default defineComponent({
  setup() {
    const email = ref('')
    const password = ref('')
    const msg = ref('')

    const authStore = useAuthStore()

    return { email, password, authStore, msg }
  },
  methods: {
    loginAction() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user
          user.getIdToken().then((token) => {
            this.authStore.loginSuccess(token, user.uid)
            this.$router.push({ path: '/' })
          })
        })
        .catch((error) => {
          this.msg = error.message
        })
    }
  }
})
</script>
