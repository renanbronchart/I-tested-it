<template>
  <div id="app">
    <TheHeader />
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import TheHeader from '@/components/TheHeader.vue'

export default Vue.extend({
  components: {
    TheHeader
  }
})
</script>

<style lang='scss'>
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
