<template>
  <div class="nav">
    <router-link
      to="/"
      class="nav__link"
    >
      Home
    </router-link>
    <router-link
      to="/create"
      class="nav__link"
      v-if="userId"
    >
      Create
    </router-link>
    <router-link
      to="/login"
      class="nav__link"
      v-if="!userId"
    >
      Login or SignUp
    </router-link>
    <router-link
      to="/top"
      class="nav__link">
      top
    </router-link>
    <a
      href="#"
      @click.prevent="logout"
      v-if="userId"
    >Logout</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/settings'

export default Vue.extend({
  computed: {
    userId (): string {
      return this.$root.$data.userId
    }
  },
  methods: {
    logout () {
      localStorage.removeItem(GC_USER_ID)
      localStorage.removeItem(GC_AUTH_TOKEN)
      this.$root.$data.userId = null
    }
  }
})
</script>

<style lang='scss'>
  .nav {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
  }

  .nav__link {
    padding: 20px;
  }
</style>
