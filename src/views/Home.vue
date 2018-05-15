<template>
  <div>
    <section>
      <ArticleList />
    </section>
    <aside>
      <AuthorList />
    </aside>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ArticleList from '@/components/ArticleList.vue'
import AuthorList from '@/components/AuthorList.vue'

export default Vue.extend({
  components: {
    ArticleList,
    AuthorList
  }
})
</script>
