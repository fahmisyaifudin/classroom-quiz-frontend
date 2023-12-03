<template>
  <header>
    <!-- Sidebar -->
    <nav class="collapse d-lg-block sidebar collapse bg-white">
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
          <router-link
            to="/"
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            :class="{ active: currentRoute == 'bank-soal' || currentRoute == 'create-bank-soal' }"
            aria-current="true"
          >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Bank Soal</span>
          </router-link>
          <router-link
            to="/quiz"
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            :class="{
              active:
                currentRoute == 'quiz' ||
                currentRoute == 'quiz-create' ||
                currentRoute == 'quiz-detail'
            }"
          >
            <i class="fas fa-chart-area fa-fw me-3"></i><span>Quiz</span>
          </router-link>
        </div>
      </div>
    </nav>
    <!-- Sidebar -->

    <!-- Navbar -->
    <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Right links -->
        <ul class="navbar-nav ms-auto d-flex flex-row">
          <!-- Avatar -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="text-white">{{ profileInfo.name }} ({{ profileInfo.role }})</span>
              <span class="mx-2 text-white">|</span>
              <a @click="logoutAction" class="mx-2 text-white">Logout</a>
            </a>
          </li>
        </ul>
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  </header>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth'
import { defineComponent } from 'vue'

type Profile = {
  auth_key: string
  fullname: string
  role: string
}

export default defineComponent({
  setup() {
    const store = useAuthStore()

    return { store }
  },
  computed: {
    currentRoute() {
      return this.$route.name
    },
    profileInfo() {
      return this.store.profile
    }
  },
  methods: {
    logoutAction() {
      this.store.logout()
    }
  },
  async created() {
    if (!(this.store.profile.name.length > 0)) {
      const response = await this.store.baseRequest({
        path: '/api/profile',
        method: 'GET'
      })
      const profile = response.data.data as Profile
      this.store.setProfile({ name: profile.fullname, role: profile.role })
    }
  }
})
</script>
