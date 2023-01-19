<template>

  <div v-if="!editable" class="card m-2 shadow p-2">

    <router-link class="normal-link" :to="'/workouts/' + id">
      <img class="card-img-top" style="width: 230px;" src="../assets/workout.png">
      <div class="card-body p-3">
        <h5 class="card-title">{{ workout.name }}</h5>
        <small class="card-text text-secondary limit-lines">{{ workout.description }}</small>
        <div class="text-info mt-3">Duration: {{ workout.duration }}</div>
        <div class="">Sets: {{ workout.sets }}</div>
        <div class="">Reps: {{ workout.reps }}</div>
      </div>
    </router-link>

    <button class="btn btn-outline-danger w-100 mt-5" @click="deleteWorkout">Delete</button>
    <button v-if="canEdit" class="btn btn-outline-secondary w-100 mt-2" @click="editable = true">Edit</button>
    <button v-if="!canEdit" class="btn btn-outline-info w-100 mt-2" @click="openWorkout(id);">See more</button>

  </div>

  <div v-if="editable" class="card shadow p-2">

    <img class="card-img-top" style="width: 230px;" src="../assets/workout.png">
    <div class="card-body p-3">
      <h5 class="card-title">{{ workout.name }}</h5>
      <small class="card-text text-secondary limit-lines">{{ workout.description }}</small>
    </div>

    <form @submit.prevent="editWorkout">
      <div class="form-group">
        <label for="sets">Sets:</label>
        <input type="number" class="form-control" id="sets" v-model="workout.sets">
      </div>

      <div class="form-group">
        <label for="reps">Reps:</label>
        <input type="number" class="form-control" id="reps" v-model="workout.reps">
      </div>

      <button class="btn btn-outline-success w-100 mt-5 mb-2" type="submit">Save</button>
      <button class="btn btn-outline-warning w-100" @click.stop="goToAllWorkouts()">Cancel</button>

    </form>
  </div>

</template>


<script>
export default {
  emits: ["workoutDeleted", "workoutUpdated"],
  props: [
    "id",
    "canEdit"
  ],
  data() {
    return {
      editable: false,
      workout: { url: "" },
    }
  },
  methods: {
    async deleteWorkout() {
      await this.$store.dispatch('deleteWorkout', { id: this.id });
      this.$emit('workoutDeleted', { id: this.id });
    },
    async editWorkout() {
      await this.$store.dispatch('updateWorkout', this.workout);
      this.$emit('workoutUpdated', this.workout);
      this.$router.push({ path: '/workouts' });
    },
    goToAllWorkouts() {
      this.$router.push({ path: '/workouts' });
    },
    openWorkout(id) {
      this.$router.push({ path: '/workouts/' + id })
    }
  },
  async created() {
    this.workout = { ... await this.$store.getters.getWorkoutById(this.id) };
  }
};
</script>

<style scoped>
.card-img-top {
  width: 100%;
  object-fit: cover;
}

.normal-link {
  text-decoration: none;
  color: inherit;
}

.card {
  max-width: 250px;
}

.limit-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>