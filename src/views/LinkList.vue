<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <link-item
      v-for="(link, index) in allLinks"
      :key="link.id"
      :link="link"
      :index="index"
    />
  </div>
</template>

<script>
import { ALL_LINKS_QUERY, NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../constants/graphql'
import LinkItem from '@/components/LinkItem'
import Vue from 'vue'

export default Vue.extend({
  name: 'LinkList',
  data () {
    return {
      allLinks: [],
      loading: 0
    }
  },
  components: {
    LinkItem
  },
  apollo: {
    allLinks: {
      query: ALL_LINKS_QUERY,
      subscribeToMore: [
        {
          document: NEW_LINKS_SUBSCRIPTION,
          variables () {
            return {
              param: this.param
            }
          },
          updateQuery: (previousResult, { subscriptionData }) => {
            if (!subscriptionData.data.Link) return

            const newAllLinks = [
              subscriptionData.data.Link.node,
              ...previousResult.allLinks
            ]

            const result = {
              ...previousResult,
              allLinks: newAllLinks
            }

            return result
          }
        },
        {
          document: NEW_VOTES_SUBSCRIPTION,
          updateQuery: (previousData, { subscriptionData }) => {
            if (!subscriptionData.data.Vote) return

            const votedLinkIndex = previousData.allLinks.findIndex(link => link.id === subscriptionData.data.Vote.link.id)
            const link = subscriptionData.data.Vote.link
            const newAllLinks = [...previousData.allLinks]
            newAllLinks[votedLinkIndex] = link

            const result = {
              ...previousData,
              allLinks: newAllLinks
            }

            return result
          }
        }
      ]
    }
  }
})
</script>
