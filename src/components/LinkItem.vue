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

import { CREATE_VOTE_MUTATION } from '@/constants/graphql'
import { GC_USER_ID } from '@/constants/settings'

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
    }
  },
  computed: {
    userId (): number {
      return parseInt(this.$root.$data.userId)
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
    voteForLink () {

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
