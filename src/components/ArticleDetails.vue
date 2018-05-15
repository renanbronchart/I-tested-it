<template>
  <div>
    <BaseAvatar
      background=""
      :user="article.user"
    />
    <p>Posted : {{ timeDifferenceForDate(article.createdAt) }}</p>
    <p>Votes : {{ article.votes.length }}</p>
    <p>By {{ article.user ? article.user.name : 'Unknown' }}</p>
    <BaseButton @eventClick="voteForLink()">
      Votez pour cet article
    </BaseButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import BaseAvatar from '@/components/BaseAvatar.vue'
import BaseButton from '@/components/BaseButton.vue'

import { CREATE_VOTE_MUTATION, ALL_LINKS_QUERY } from '@/constants/graphql'
import { GC_USER_ID, LINKS_PER_PAGE } from '@/constants/settings'
import timeDifferenceForDate from '@/utils/timeDifference'

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
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    timeDifferenceForDate,
    voteForLink () : boolean {
      const userId = localStorage.getItem(GC_USER_ID)
      const voterIds = this.article.votes.map((vote:vote) => vote.user.id)
      const linkId = this.article.id

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
      const page = parseInt(this.$route.params.page, 10)
      const isNewPage = this.$route.path.includes('new')
      const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
      const data = store.readQuery({
        query: ALL_LINKS_QUERY,
        variables: {
          first: 10,
          skip,
          orderBy: 'createdAt_DESC'
        }
      })

      const votedLink = data.allLinks.find((link: link) => {
        return link.id === linkId
      })

      votedLink.votes = createVote.link.votes

      store.writeQuery({
        query: ALL_LINKS_QUERY,
        data
      })
    }
  },
  computed: {
    userId (): string {
      return this.$root.$data.userId
    }
  },
  components: {
    BaseAvatar,
    BaseButton
  }
})
</script>
