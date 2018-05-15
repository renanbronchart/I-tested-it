<template>
  <div>
    <BaseAvatar
      background=""
      :user="user"
    />
    <p>Posted : {{ timeDifferenceForDate(date) }}</p>
    <p>Votes : {{ votes }}</p>
    <p>By {{ user ? user.name : 'Unknown' }}</p>
    <a
      href="#"
      @click.prevent="voteForLink()"
    >
      Vote for this article
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import BaseAvatar from '@/components/BaseAvatar.vue'

import timeDifferenceForDate from '@/utils/timeDifference'

export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      default: 0
    }
  },
  methods: {
    timeDifferenceForDate
  },
  components: {
    BaseAvatar
  }
})
</script>
