import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import LinkList from '@/views/LinkList.vue'
import CreateLink from '@/views/CreateLink.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: LinkList
    },
    {
      path: '/create',
      name: 'create',
      component: CreateLink
    }
  ]
})
