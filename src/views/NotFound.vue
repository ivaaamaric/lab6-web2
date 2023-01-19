<template>
  <div class="card p-5 border-danger">
    <h1 class="text-danger">Error 404!<br />
      Page /{{ $route.params.catchAll }} doesn't exist.</h1>
    <router-link to="/" class="btn btn-outline-danger w-100 my-3">Try this</router-link>
  </div>
</template>

<script>
</script>