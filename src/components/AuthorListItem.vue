<template>
  <BaseCard background="http://lorempicsum.com/nemo/627/300/4">
    <div slot="footer">
      <p>footer author list item</p>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import Vue from 'vue'

import BaseCard from '@/components/BaseCard.vue'

export default Vue.extend({
  components: {
    BaseCard
  }
})
</script>
