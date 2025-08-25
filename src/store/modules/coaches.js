import axios from 'axios';

const baseURL =
  'https://find-coach-3000-default-rtdb.europe-west1.firebasedatabase.app';

export default {
  namespaced: true,
  state() {
    return {
      userIsCoach: true,
      activeCoach: null,
      coaches: [],
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
    activeCoach(state) {
      return state.activeCoach;
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
    setActiveCoach(state, payload) {
      state.activeCoach = payload;
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
    async loadCoachDetails(context, coachId) {
      const url = `${baseURL}/coaches/${coachId}.json`;
      const res = await axios.get(url);
      context.commit('setActiveCoach', res.data);
    },
  },
};
