<template>
  <div v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <div v-else-if="selectedCoach">
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :title="area"
          :type="area"
        >
        </base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Reach out</h2>
          <base-button :to="contactLink" v-if="isDetailsPage">
            Contact
          </base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],

  created() {
    this.loadCoach();
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    selectedCoach() {
      return this.$store.getters['coaches/activeCoach'];
    },
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return `${this.$route.path}/contact`;
    },
    isDetailsPage() {
      return this.$route.path.endsWith(this.id);
    },
  },
  methods: {
    async loadCoach() {
      this.isLoading = true;
      await this.$store.dispatch('coaches/loadCoachDetails', this.id);
      this.isLoading = false;
    },
  },
};
</script>
