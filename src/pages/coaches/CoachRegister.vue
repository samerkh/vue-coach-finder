<template>
  <base-card>
    <h2>Register as a coach</h2>
    <coach-form @submit-data="saveData"></coach-form>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(coachData) {
      this.$store.dispatch('coaches/registerCoach', coachData);
      this.$router.replace('/coaches');
    },
  },
};
</script>
