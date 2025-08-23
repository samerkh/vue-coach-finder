<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" v-model="frontend" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-options">
      <input type="checkbox" id="backend" v-model="backend" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-options">
      <input type="checkbox" id="career" v-model="career" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      frontend: true,
      backend: true,
      career: true,
    };
  },
  watch: {
    frontend: 'onChangeFilter',
    backend: 'onChangeFilter',
    career: 'onChangeFilter',
  },
  methods: {
    onChangeFilter() {
      const filters = {
        frontend: this.frontend,
        backend: this.backend,
        career: this.career,
      };
      this.$emit('change-filter', filters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
