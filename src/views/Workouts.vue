<template>

  <div v-if="selectedWorkout">
    <div class="d-flex justify-content-center">
      <workout :key="selectedWorkout.id" v-bind:id="selectedWorkout.id" @workout-updated="workoutUpdated"
        @workout-deleted="workoutDeleted" can-edit="true"></workout>
    </div>
  </div>

  <div v-else>
    <h2>Hi, {{ user }}! Pick a workout and get started ...</h2>
    <div class="container-fluid pt-2 d-flex flex-wrap">
      <workout v-for="workout in workouts" :key="workout.id" v-bind:id="workout.id" @workout-updated="workoutUpdated"
        @workout-deleted="workoutDeleted"></workout>
    </div>
  </div>

</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      user: this.$store.getters.user,
      selectedWorkout: null,
      selectedWorkoutIndex: -1,
    };
  },
  computed: {
    workouts() {
      return this.$store.getters.workouts;
    }
  },
  watch: {
    $route(to, from) {
      this.selectedWorkout = this.workouts.find(x => x.id == this.$route.params.id);
      this.selectedWorkoutIndex = this.workouts.findIndex(x => x.id == this.$route.params.id);
    },
  },
  methods: {
    workoutUpdated(workout) { },
    workoutDeleted(args) {
      if (this.selectedWorkout && this.selectedWorkout.id === args.id) {
        this.selectedWorkout = null;
      }
    },
  },
  async mounted() {
    await this.$store.dispatch('loadWorkouts');
    this.selectedWorkout = this.workouts.find(x => x.id == this.$route.params.id);
  }
};
</script>
