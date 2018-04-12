<template>
  <div>{{link.description}} ({{link.url}})</div>
</template>

<script lang="ts">
export default {
  name: 'LinkItem',
  props: ['link']
}
</script>
