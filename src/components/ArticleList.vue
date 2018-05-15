<template>
  <div>
    <div>
      <h4 v-if="loading">Loading...</h4>
      <ArticleListItem
        v-for="(link, index) in orderedLinks"
        :key="link.id"
        :link="link"
        :index="index"
        :page-number="pageNumber"
      />
    </div>
    <div v-if="isNewPage">
      <button
        v-show="!isFirstPage"
        @click="previousPage()"
      >
        Previous
      </button>
      <button
        v-show="morePages"
        @click="nextPage()"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ALL_LINKS_QUERY, NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../constants/graphql'
import { LINKS_PER_PAGE } from '@/constants/settings'
import ArticleListItem from '@/components/ArticleListItem'
import Vue from 'vue'
import _ from 'lodash'

export default Vue.extend({
  name: 'LinkList',
  data () {
    return {
      allLinks: [],
      count: 0,
      loading: 0
    }
  },
  computed: {
    orderedLinks () {
      if (this.$route.path.includes('top')) {
        return _.orderBy(this.allLinks, 'votes.length').reverse()
      } else {
        return this.allLinks
      }
    },
    isFirstPage () {
      return parseInt(this.$route.params.page, 10) === 1
    },
    isNewPage () {
      return this.$route.path.includes('new')
    },
    pageNumber () {
      return parseInt(this.$route.params.page, 10)
    },
    morePages () {
      return parseInt(this.$route.params.page, 10) < this.count / LINKS_PER_PAGE
    }
  },
  components: {
    ArticleListItem
  },
  methods: {
    getLinksToRender (isNewPage) {
      if (isNewPage) {
        return this.$apollo.queries.allLinks
      }

      const rankedLinks = this.$apollo.queries.allLinks.slice()
      rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)

      return rankedLinks
    },
    nextPage () {
      const page = parseInt(this.$route.params.page, 10)

      if (page < this.count / LINKS_PER_PAGE) {
        const nextPage = page + 1
        this.$router.push({name: 'newPage', params: { page: nextPage }})
      }
    },
    previousPage () {
      const page = parseInt(this.$route.params.page, 10)

      if (page > 1) {
        const previousPage = page - 1
        this.$router.push({name: 'newPage', params: { page: previousPage }})
      }
    }
  },
  apollo: {
    allLinks: {
      query: ALL_LINKS_QUERY,
      variables () {
        const page = parseInt(this.$route.params.page, 10)
        const isNewPage = this.$route.path.includes('new')
        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
        const first = isNewPage ? LINKS_PER_PAGE : 10
        const orderBy = isNewPage ? 'createdAt_DESC' : null

        return {
          first,
          skip,
          orderBy
        }
      },
      update (data) {
        this.count = data._allLinksMeta.count

        return data.allLinks
      },
      subscribeToMore: [
        {
          document: NEW_LINKS_SUBSCRIPTION,
          updateQuery: (previousResult, { subscriptionData }) => {
            if (!subscriptionData.data.Link) return

            const newAllLinks = [
              subscriptionData.data.Link.node,
              ...previousResult.allLinks
            ]

            const result = {
              ...previousResult,
              allLinks: newAllLinks.slice(0, LINKS_PER_PAGE)
            }

            return result
          }
        },
        {
          document: NEW_VOTES_SUBSCRIPTION,
          updateQuery: (previousData, { subscriptionData }) => {
            if (!subscriptionData.data.Vote) return

            const votedLinkIndex = previousData.allLinks.findIndex(link => link.id === subscriptionData.data.Vote.node.link.id)
            const link = subscriptionData.data.Vote.node.link
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
