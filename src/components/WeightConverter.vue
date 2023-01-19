<template>
  <div class="card p-5 bg-info">
    <h4 class="text-white pb-4">Want to know how much you can lift?</h4>
    <form>
      <div class="form-group row">
        <label for="kg" class="text-white col-5 col-form-label">Weight in kg:</label>
        <div class="col-7">
          <input type="number" class="form-control" placeholder="... kgs" v-model.number="kg" @keyup="kgToLbs" />
        </div>
      </div>
      <div class="form-group row py-2">
        <label for="lbs" class="text-white col-5 col-form-label">Weight in lbs:</label>
        <div class="col-7">
          <input type="number" class="form-control" placeholder="... lbs" v-model.number="lbs" @keyup="lbsToKg" />
        </div>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      kg: null,
      lbs: null,
    };
  },
  methods: {
    kgToLbs() {
      this.lbs = 2.20462 * this.kg;
    },
    lbsToKg() {
      this.kg = 0.453592 * this.lbs;
    },
  },
};
</script>
