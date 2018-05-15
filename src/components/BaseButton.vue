<template>
  <button
    class="button"
    @click.prevent="eventClick"
  >
    <router-link
      :to="{name: linkName, params: linkParams}"
      :title="linkTitle"
      class="button__link"
      v-if='linkName'
    />
    <slot/>
    <i
      class="material-icons"
      :class="extraClassIcon"
      v-if='iconName'
    >
      {{ iconName }}
    </i>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    linkName: {
      type: String,
      default: null
    },
    linkParams: {
      type: Object,
      default: null
    },
    linkTitle: {
      type: String,
      default: 'Button'
    },
    extraClassIcon: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      default: null
    }
  },
  methods: {
    eventClick () {
      this.$emit('eventClick')
    }
  }
})
</script>
