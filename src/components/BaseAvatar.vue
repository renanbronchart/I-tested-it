<template>
  <div>
    {{ background }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    background: {
      type: String,
      default: ''
    }
  }
})
</script>
