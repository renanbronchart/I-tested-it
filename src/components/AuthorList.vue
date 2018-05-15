<template>
  <div>
    <h2>Les grands auteurs</h2>
    <AuthorListItem />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import AuthorListItem from '@/components/AuthorListItem.vue'

export default Vue.extend({
  components: {
    AuthorListItem
  }
})
</script>
