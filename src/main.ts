import './registerServiceWorker'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import 'tachyons'
import Vue from 'vue'
import VueApollo from 'vue-apollo'

import router from './router'

import App from './App.vue'

import { GC_USER_ID, GC_AUTH_TOKEN } from './constants/settings'

Vue.config.productionTip = false

let userId = localStorage.getItem(GC_USER_ID)

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'https://api.graph.cool/simple/v1/cjfvm8as87e1i0120oii0tcbv'
})

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjfvm8as87e1i0120oii0tcbv',
  options: {
    reconnect: true
  }
})

const link = split(
  // split based on operation type
  (data) => {
    let query: any
    query = data.query

    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem(GC_AUTH_TOKEN)
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  })

  let result = null

  if (forward) {
    result = forward(operation)
  }

  return result
})

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

interface AsyncIterator<T> {
  next(value?: any): Promise<IteratorResult<T>>;
  return?(value?: any): Promise<IteratorResult<T>>;
  throw?(e?: any): Promise<IteratorResult<T>>;
}

declare module 'vue/types/vue' {
  interface Vue {
    apollo: object
  }
}

new Vue({
  router,
  // store,
  provide: apolloProvider.provide(),
  data: {
    userId
  },
  render: h => h(App)
}).$mount('#app')
