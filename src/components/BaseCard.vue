<template>
  <div
    class="card"
    :class="extraClass"
    :style="background ? { backgroundImage: 'url(' + background + ')' } : ''"
    ref="card"
  >
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseCard',
  props: {
    extraClass: {
      type: String,
      default: null
    },
    background: {
      type: String,
      default: null
    }
  }
})
</script>

<style lang='scss'>
.card {
  width: 25%;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}
</style>
