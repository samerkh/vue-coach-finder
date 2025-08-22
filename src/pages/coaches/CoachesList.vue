<template>
  <section>
    <coach-filter @change-filter="setFilter"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button to="/register">Register as coach</base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :areas="coach.areas"
          :description="coach.description"
          :rate="coach.hourlyRate"
        ></coach-item>
      </ul>
      <h2 v-else>No coaches found.</h2>
    </base-card>
  </section>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      const filteredCoaches = coaches.filter((coach) => {
        if (this.filters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.filters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.filters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });

      return filteredCoaches;
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    setFilter(filters) {
      this.filters = filters;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
