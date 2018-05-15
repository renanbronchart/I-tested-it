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
        :article="link"
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
import { GC_USER_ID } from '@/constants/settings'

export default Vue.extend({
  name: 'LinkItem',
  props: {
    link: {
      default: null,
      type: Object
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
