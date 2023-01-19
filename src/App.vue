<template>
  <navigation></navigation>
  <div v-if="authorized" class="d-flex justify-content-center">
    <router-view class="my-5 mx-5" />
  </div>
  <div v-else class="d-flex justify-content-center">
    <login></login>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Navigation from './components/NavBar.vue';

export default ({
  components: {
    Login,
    Navigation
  },
  computed: {
    authorized() {
      return this.$store.getters.authorized || this.$route.params.catchAll;
    }
  }
})
</script>
