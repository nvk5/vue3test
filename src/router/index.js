import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import PostPage from '@/pages/PostPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import PostIdPage from '@/pages/PostIdPage.vue'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
      path: '/posts',
      component: PostPage
  },
  {
      path: '/about',
      component: AboutPage
  },
  {
      path: '/posts/:id',
      component: PostIdPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
