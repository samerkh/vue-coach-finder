import axios from 'axios';

const baseURL =
  'https://find-coach-3000-default-rtdb.europe-west1.firebasedatabase.app';

export default {
  namespaced: true,
  state() {
    return {
      userIsCoach: false,
      coaches: [
        // {
        //   id: 'c1',
        //   firstName: 'Maximilian',
        //   lastName: 'Schwarzmüller',
        //   areas: ['frontend', 'backend', 'career'],
        //   description:
        //     "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        //   hourlyRate: 30,
        // },
        // {
        //   id: 'c2',
        //   firstName: 'Julie',
        //   lastName: 'Jones',
        //   areas: ['frontend', 'career'],
        //   description:
        //     'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        //   hourlyRate: 30,
        // },
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
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setUserIsCoach(state) {
      state.userIsCoach = true;
    },
  },
  actions: {
    async registerCoach(context, coachData) {
      const userId = context.rootGetters.userId;
      const url = `${baseURL}/coaches/${userId}.json`;

      const res = await axios.put(url, coachData);

      context.commit('registerCoach', {
        ...res.data,
        id: userId,
      });
      context.commit('setUserIsCoach');
    },
    async loadCoaches(context) {
      const url = `${baseURL}/coaches.json`;
      const res = await axios.get(url);
      const coachesList = Object.entries(res.data).map(([id, data]) => ({
        id,
        ...data,
      }));
      context.commit('setCoaches', coachesList);
    },
  },
};
