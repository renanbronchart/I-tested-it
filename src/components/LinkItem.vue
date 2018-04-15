<template>
  <div>{{ link.description }} ({{ link.url }})</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LinkItem',
  props: {
    'link': {
      default: null,
      type: Object
    }
  }
})
</script>
