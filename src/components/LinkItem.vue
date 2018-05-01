<template>
  <div class="flex mt2 items-start">
    <div class="flex items-center">
      <span class="gray">{{ linkNumber }}.</span>
      <div
        v-if="userId"
        class="ml1 gray f11 upvote"
        @click="voteForLink()">
        ▲
      </div>
    </div>
    <div class="ml1">
      <a
        :href="link.url"
        class="link"
        target="_blank">
        {{ link.description }} ({{ link.url }})
      </a>
      <div class="f6 lh-copy gray">
        {{ link.votes.length }} votes | by {{ link.postedBy ? link.postedBy.name : 'Unknown' }} {{ timeDifferenceForDate(link.createdAt) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import timeDifferenceForDate from '@/utils/timeDifference'

import { CREATE_VOTE_MUTATION, ALL_LINKS_QUERY } from '@/constants/graphql'
import { GC_USER_ID, LINKS_PER_PAGE } from '@/constants/settings'

interface vote {
  user: user
}

interface user {
  id: string
}

interface link {
  id: string
}

export default Vue.extend({
  name: 'LinkItem',
  props: {
    link: {
      default: null,
      type: Object
    },
    index: {
      default: 0,
      type: Number
    },
    pageNumber: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      linksPerPage: LINKS_PER_PAGE
    }
  },
  computed: {
    userId (): string {
      return this.$root.$data.userId
    },
    linkNumber (): number {
      let result = this.index + 1

      if (this.$route.path.includes('new')) {
        result = (this.pageNumber - 1) * this.linksPerPage + (this.index + 1)
      }

      return result
    }
  },
  methods: {
    timeDifferenceForDate,
    voteForLink () : boolean {
      const userId = localStorage.getItem(GC_USER_ID)
      const voterIds = this.link.votes.map((vote:vote) => vote.user.id)
      const linkId = this.link.id

      if (voterIds.includes(userId)) {
        alert(`User ${userId} has already voted`)
        return false
      } else if (typeof userId === 'undefined') {
        alert('You are not registred')
        return false
      }

      this.$apollo.mutate({
        mutation: CREATE_VOTE_MUTATION,
        variables: {
          userId,
          linkId
        },
        update: (store, {data}) => {
          const { createVote } = data!

          this.updateStoreAfterVote(store, createVote, linkId)
        }
      })

      return true
    },
    updateStoreAfterVote (store: any, createVote : any, linkId : string) {
      const data = store.readQuery({
        query: ALL_LINKS_QUERY,
        variables: {
          first: 10,
          skip: 0,
          orderBy: 'createdAt_DESC'
        }
      })

      const votedLink = data.allLinks.find((link: link) => link.id === linkId)

      votedLink.votes = createVote.link.votes

      store.writeQuery({
        query: ALL_LINKS_QUERY,
        data
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  .upvote {
    cursor: pointer;
  }

  .link {
    text-decoration: none;
    color: black;
  }
</style>
