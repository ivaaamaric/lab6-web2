<template>
    <div class="d-flex justify-content-between bg-light py-4 px-5 border-bottom border-secondary">
        <h2 class="text-info">Workout Planner</h2>
        <h3 class="d-flex">
            <div class="nav d-flex">
                <router-link to="/" class="btn btn-light mx-1">Workouts</router-link>
                <router-link to="/converter" class="btn btn-light mx-1">Weights</router-link>
                <router-link to="/music" class="btn btn-light mx-1">Playlist</router-link>
            </div>
            <div v-if="$store.getters.user != 'null'" class="mx-1 btn btn-info" @click="logout">Log out</div>
        </h3>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.commit('logoutUser');
        },
    }
};
</script>