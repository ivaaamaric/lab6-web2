import { createStore } from "vuex";
import firebase from "../firebase";
import { getDatabase, ref, child, get, set } from "firebase/database";

export default createStore({
  state: {
    user: null,
    workouts: [],
  },
  mutations: {
    setUser(store, user) {
      if (localStorage) {
        localStorage.setItem('user', user);
      }
      store.user = user;
    },
    logoutUser(store) {
      if (localStorage) {
        localStorage.removeItem('user');
      }
      store.user = null;
    },
    setWorkouts(store, workouts) {
      store.workouts = workouts;
    }
  },
  getters: {
    user(store) {
      if (localStorage) {
        store.user = localStorage.getItem('user');
      }
      return `${store.user}`;
    },
    authorized(store) {
      return !!store.user;
    },
    workouts(store) {
      return store.workouts;
    },
    getWorkoutById: (state, getters) => (id) => {
      return getters.workouts.find(w => w.id === id);
    }
  },
  actions: {
    async loadWorkouts(context) {
      if (context.getters.workouts.length === 0) {
        const dbRef = ref(getDatabase(firebase, "https://spa-web2-default-rtdb.europe-west1.firebasedatabase.app/"));
        get(child(dbRef, 'workouts')).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            var workouts = [];
            snapshot.val().forEach(element => {
              console.log(element)
              workouts.push({
                id: element.id,
                name: element.name,
                description: element.description,
                duration: element.duration,
                sets: element.sets,
                reps: element.reps
              });
            });
            context.commit("setWorkouts", workouts);
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    },
    deleteWorkout(context, { id }) {
      context.commit("setWorkouts", context.getters.workouts.filter((x) => x.id !== id));
    },
    updateWorkout(context, workout) {
      context.commit("setWorkouts", context.getters.workouts.map(x => x.id == workout.id ? workout : x));
    },
  },
  modules: {},
});
