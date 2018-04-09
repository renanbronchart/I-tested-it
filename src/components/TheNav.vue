<template>
  <div class="nav">
    <router-link to="/" class="nav__link">Home</router-link>
    <!-- <router-link to="/vue-js-a4567" class="nav__link">TheTest</router-link> -->
    <router-link to="/new" class="nav__link">New</router-link>
    <!-- <router-link to="/edit/vue-js-a4567" class="nav__link">Edit</router-link> -->
  </div>
</template>

<style lang='scss'>
  .nav {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
  }

  .nav__link {
    padding: 20px;
  }
</style>
