import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
import HomeView from '../views/bank-soal/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CreateView from '../views/bank-soal/CreateView.vue'
import QuizListView from '../views/quiz/ListView.vue'
import QuizCreateView from '../views/quiz/CreateView.vue'
import QuizDetailView from '../views/quiz/DetailView.vue'

import EmptyView from '../views/EmptyView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(undefined),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'bank-soal',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create-bank-soal',
      component: CreateView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizListView
    },
    {
      path: '/quiz/create',
      name: 'quiz-create',
      component: QuizCreateView
    },
    {
      path: '/quiz/:id',
      name: 'quiz-detail',
      component: QuizDetailView
    },
    {
      path: '/empty',
      name: 'empty',
      component: EmptyView
    }
  ]
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const auth = useAuthStore()
    if (to.name !== 'login' && !auth.$state.isAuthenticated) next({ name: 'login' })
    else next()
  }
)

export default router
