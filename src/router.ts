import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/Home.vue')
const LinkList = () => import('@/views/LinkList.vue')
const CreateLink = () => import('@/views/CreateLink.vue')
const TheLogin = () => import('@/views/TheLogin.vue')
const Search = () => import('@/components/TheSearch.vue')
const Article = () => import('@/views/Article.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/new/1'
    },
    {
      path: '/article/:name',
      name: 'article',
      component: Article
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
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/top',
      name: 'topPage',
      component: Home
    }
  ]
})
