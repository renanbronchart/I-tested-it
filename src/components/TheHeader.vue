<template>
  <header class="header">
    <h1 class="header__title">I tested It</h1>
    <TheNav />
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

import TheNav from '@/components/TheNav.vue'

export default Vue.extend({
  name: 'TheHeader',
  components: {
    TheNav
  }
})

</script>

<style lang='scss'>
  .header {
    background: green;
    padding: 40px;
  }

  .header__title {
    color: white;
    position: relative;
    &:after {
      content: '';
      width: 120%;
      height: 2px;
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
    }
  }
</style>
