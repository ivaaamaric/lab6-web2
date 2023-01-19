<template>
  <div class="bg-light card p-5 m-5 border-info">
    <h3>Welcome!</h3>
    <h6>Your name is ...?</h6>
    <form @submit.prevent="login">
      <input class="form-control" placeholder="name" v-model.trim="name" required />
      <button class="btn btn-info my-2 w-100" type="submit">Start workout</button>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    login() {
      this.$store.commit('setUser', this.name);
    }
  },
};
</script>
