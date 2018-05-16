import { createApolloClient } from '@/utils/graphql.ts'
import { CREATE_USER_MUTATION, SIGN_IN_USER_MUTATION } from '@/constants/graphql.ts'

import * as types from '@/store/mutationTypes.js'

const state = {
  userId: null,
  token: null
}

const mutations = {
  [types.SAVE_USER] (state, {userId, token}) {
    state.userId = userId
    state.token = token
  },
  [types.LOGOUT] (state) {
    state.userId = null
    state.token = null
  }
}

const actions = {
  async login ({commit}, {email, password}) {
    const response = await createApolloClient().mutate({
      mutation: SIGN_IN_USER_MUTATION,
      variables: {
        email,
        password
      }
    })

    const id = response.data.signinUser.user.id
    const token = response.data.signinUser.token

    commit(types.SAVE_USER, {
      userId: id,
      token
    })
  },
  async signup ({commit}, {email, name, password}) {
    const response = await createApolloClient().mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        name,
        email,
        password
      }
    })

    const id = response.data.signinUser.user.id
    const token = response.data.signinUser.token

    commit(types.SAVE_USER, {
      userId: id,
      token
    })
  }
}

export default {
  state,
  actions,
  mutations
}
