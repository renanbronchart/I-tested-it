<template>
  <div class="articleList__item">
    <router-link :to="{ name: 'article', params: { name: link.url }}">
      <h3 class="articleList__itemHeader">{{ link.url }}</h3>
    </router-link>
    <div>
      <router-link :to="{ name: 'article', params: { name: link.url }}">
        <BaseCard
          background="http://lorempicsum.com/nemo/627/300/4"
          class="card--empty"
        />
      </router-link>
      <p>{{ link.description }}</p>
      <ListTags
        :items="link.tags"
        v-if="link.tags"
      />
      <ArticleDetails
        :user="link.postedBy"
        :date="link.createdAt"
        :votes="link.votes.length"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import BaseCard from '@/components/BaseCard.vue'
import ListTags from '@/components/ListTags.vue'
import ArticleDetails from '@/components/ArticleDetails.vue'

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
    }
  },
  methods: {
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
  },
  components: {
    ListTags,
    BaseCard,
    ArticleDetails
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
