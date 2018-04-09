import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import TheTest from '@/views/TheTest.vue'
import TheTestEditor from '@/views/TheTestEditor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new',
      name: 'new',
      component: TheTestEditor
    },
    {
      path: '/:slug',
      name: 'test',
      component: TheTest
    },
    {
      path: '/edit/:slug',
      name: 'edit',
      component: TheTestEditor
    }
  ]
})
