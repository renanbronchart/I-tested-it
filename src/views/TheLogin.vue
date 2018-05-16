<template>
  <div>
    <h4>{{ login ? 'Login' : 'Sign Up' }}</h4>
    <div class="flex flex-column">
      <input
        v-show="!login"
        v-model="name"
        type="text"
        placeholder="Your name"
      >
      <input
        v-model="email"
        type="email"
        placeholder="Your email"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Your password"
      >
    </div>
    <div class="flex mt3">
      <div
        class="pointer button mr2"
        @click.prevent="confirm()"

      >
        {{ login ? 'login' : 'create account' }}
      </div>
      <div
        class="pointer button"
        @click.prevent="login = !login"
      >
        {{ login ? 'Need to create account' : 'already have an account' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/settings'
import { CREATE_USER_MUTATION, SIGN_IN_USER_MUTATION } from '../constants/graphql'

export default Vue.extend({
  name: 'TheLogin',
  data () {
    return {
      email: '',
      name: '',
      password: '',
      login: true
    }
  },
  methods: {
    confirm () {
      const { name, email, password } = this.$data

      if (this.login) {
        this.$apollo.mutate({
          mutation: SIGN_IN_USER_MUTATION,
          variables: {
            email,
            password
          }
        }).then((result) => {
          const id: string = result.data.signinUser.user.id
          const token: string = result.data.signinUser.user.token

          this.saveUserData(id, token)
        }).catch(error => {
          console.log(error)
        })

        this.$router.push('/')
      } else {
        this.$apollo.mutate({
          mutation: CREATE_USER_MUTATION,
          variables: {
            name,
            email,
            password
          }
        }).then((result) => {
          const id: string = result.data.signinUser.user.id
          const token: string = result.data.signinUser.user.token

          this.saveUserData(id, token)
        }).catch(error => {
          console.log(error)
        })

        this.$router.push('/')
      }
    },
    saveUserData (id: string, token: string): void {
      localStorage.setItem(GC_USER_ID, id)
      localStorage.setItem(GC_AUTH_TOKEN, token)
      this.$root.$data.userId = localStorage.getItem(id)
    }
  }
})

</script>
