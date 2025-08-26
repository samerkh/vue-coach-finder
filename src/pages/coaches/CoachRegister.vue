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
    async saveData(coachData) {
      await this.$store.dispatch('coaches/registerCoach', coachData);
      const redirectUrl = this.$route.query.redirect || '/coaches';

      this.$router.replace(redirectUrl);
    },
  },
};
</script>
