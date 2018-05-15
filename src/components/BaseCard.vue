<template>
  <div
    class="card"
    :style="background ? { backgroundImage: 'url(' + background + ')' } : ''"
    ref="card"
  >
    <slot name="header"/>
    <slot name="body"/>
    <slot name="footer"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseCard',
  props: {
    background: {
      type: String,
      default: null,
      required: true
    }
  }
})
</script>

<style lang='scss'>
.card {
  width: 100%;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-origin: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.card--empty {
  min-height: 200px;
}
</style>
