<template>
  <div>
    <div class="flex flex-column mt3">
      <input
        class="mb2"
        v-model="description"
        type="text"
        placeholder="A description for the link">
      <input
        class="mb2"
        v-model="url"
        type="text"
        placeholder="The URL for the link">
    </div>
    <button @click="createLink()">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { GC_USER_ID } from '../constants/settings'
import { ALL_LINKS_QUERY, CREATE_LINK_MUTATION } from '../constants/graphql'

export default Vue.extend({
  name: 'CreateLink',
  data () {
    return {
      description: '',
      url: ''
    }
  },
  methods: {
    createLink (): boolean {
      const postedById = localStorage.getItem(GC_USER_ID)
      if (!postedById) {
        console.error('error')
        return false
      }

      const newDescription = this.description
      const newUrl = this.url

      this.url = ''
      this.description = ''

      this.$apollo.mutate({
        mutation: CREATE_LINK_MUTATION,
        variables: {
          description: newDescription,
          url: newUrl,
          postedById
        },
        update: (store, { data }): void => {
          const { createLink } = data!

          this.updateStoreAfterUpdate(store, createLink)
        }
      }).then((data) => {
        this.$router.push('/')
      }).catch((error) => {
        console.error(error)
        this.description = newDescription
        this.url = newUrl

        return false
      })

      return true
    },
    updateStoreAfterUpdate (store: any, createLink: any): void {
      const data: any = store.readQuery({
        query: ALL_LINKS_QUERY
      })

      data.allLinks.push(createLink)

      store.writeQuery({
        query: ALL_LINKS_QUERY, data
      })
    }
  }
})
</script>
