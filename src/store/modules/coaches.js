export default {
  namespaced: true,
  state() {
    return {
      userIsCoach: false,
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30,
        },
      ],
    };
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length;
    },
    isCoach(state) {
      return state.userIsCoach;
    },
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setUserIsCoach(state) {
      state.userIsCoach = true;
    },
  },
  actions: {
    registerCoach(context, data) {
      const newCoach = {
        id: new Date().toISOString(),
        ...data,
      };
      context.commit('registerCoach', newCoach);
      context.commit('setUserIsCoach');
    },
  },
};
