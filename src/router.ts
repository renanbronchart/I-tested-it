import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import LinkList from '@/views/LinkList.vue'
import CreateLink from '@/views/CreateLink.vue'
import TheLogin from '@/views/TheLogin.vue'
import Search from '@/components/TheSearch.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/new/1'
    },
    {
      path: '/create',
      name: 'create',
      component: CreateLink
    },
    {
      path: '/login',
      name: 'login',
      component: TheLogin
    },
    {
      path: '/new/:page',
      name: 'newPage',
      component: LinkList
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/top',
      name: 'topPage',
      component: LinkList
    }
  ]
})
