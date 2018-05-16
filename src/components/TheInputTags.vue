<template>
  <div class="tag-list">
    <ul>
      <li
        class="tag"
        v-for="(item, index) in tags"
        :key="index">
        <span class="title">{{ item }}</span>
        <button
          class="delete-btn"
          @click="removeTag(index)">X</button>
      </li>
      <li class="search-box">
        <input
          type="text"
          placeholder="Add tag…"
          v-model="tag"
          @keyup="addTag">
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    taglist: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      tags: this.taglist ? [...this.taglist] : [],
      tag: ''
    }
  },
  methods: {
    addTag (keyValue: any) {
      let savedInput = ''

      switch (keyValue.key) {
        case 'Enter':
          savedInput = this.tag
          break
        case ' ':
        case ',':
        case ';':
          savedInput = this.tag.substring(0, this.tag.length - 1)
          break
        default:
      }

      if (savedInput !== '') {
        this.tags.push(savedInput)
        this.tag = ''
        this.$emit('input', [...this.tags])
      }
    },
    removeTag (id: number) {
      this.tags.splice(id, 1)
      this.$emit('input', [...this.tags])
    }
  },
  watch: {
    taglist (taglist) {
      this.tags = [...taglist]
    }
  }
})
</script>
