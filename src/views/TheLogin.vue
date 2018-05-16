<template>
  <div>
    <h4>{{ loginOn ? 'Login' : 'Sign Up' }}</h4>
    <div class="flex flex-column">
      <input
        v-show="!loginOn"
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
        {{ loginOn ? 'login' : 'create account' }}
      </div>
      <div
        class="pointer button"
        @click.prevent="loginOn = !loginOn"
      >
        {{ loginOn ? 'Need to create account' : 'already have an account' }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  name: 'TheLogin',
  data () {
    return {
      email: '',
      name: '',
      password: '',
      loginOn: true
    }
  },
  methods: {
    ...mapActions([
      'login',
      'signup'
    ]),
    confirm () {
      const { name, email, password } = this.$data

      if (this.loginOn) {
        this.login({email, password})
        this.$router.push('/')
      } else {
        this.signup({email, name, password})
        this.$router.push('/')
      }
    }
  }
})

</script>
