import './registerServiceWorker'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import 'tachyons'
import Vue from 'vue'
import Vuex from 'vuex'
import VueApollo from 'vue-apollo'

import router from './router'
import store from './store'

import App from './App.vue'

import { GC_USER_ID, GC_AUTH_TOKEN } from '@/constants/settings'
import { createApolloClient } from '@/utils/graphql'

Vue.config.productionTip = false

let userId = localStorage.getItem(GC_USER_ID)

const apolloClient = createApolloClient()

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

new Vue({
  store,
  router,
  provide: apolloProvider.provide(),
  data: {
    userId
  },
  render: h => h(App)
}).$mount('#app')
