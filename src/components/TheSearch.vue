<template>
  <div>
    <div>
      Search
      <input
        type="text"
        v-model="searchText"
      >
    </div>
    <link-item
      v-for="(link, index) in allLinks"
      :key="link.id"
      :link="link"
      :index="index"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ALL_LINKS_SEARCH_QUERY } from '../constants/graphql'
import LinkItem from '@/components/LinkItem.vue'

export default Vue.extend({
  name: 'Search',
  data () {
    return {
      allLinks: [],
      searchText: ''
    }
  },
  apollo: {
    allLinks: {
      query: ALL_LINKS_SEARCH_QUERY,
      variables () {
        return {
          searchText: this.searchText
        }
      },
      skip () {
        return !this.searchText
      }
    }
  },
  components: {
    LinkItem
  }
})
</script>
