import axios from 'axios';

const baseURL =
  'https://find-coach-3000-default-rtdb.europe-west1.firebasedatabase.app';

export default {
  namespaced: true,
  state() {
    return {
      userIsCoach: false,
      activeCoach: null,
      coaches: [],
      lastFetched: null,
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
    shouldUpdate({ lastFetched }) {
      if (!lastFetched) return true;
      const currentTime = new Date().getTime();

      return (currentTime - lastFetched) / 1000 > 5;
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
    setLastFetched(state) {
      state.lastFetched = new Date().getTime();
    },
  },
  actions: {
    async registerCoach(context, coachData) {
      const userId = context.rootGetters.userId;
      const { token } = context.rootGetters;
      const url = `${baseURL}/coaches/${userId}.json?auth=${token}`;

      const res = await axios.put(url, coachData);

      context.commit('registerCoach', {
        ...res.data,
        id: userId,
      });
      context.commit('setUserIsCoach');
    },
    async loadCoaches(context, forceUpdate) {
      if (!forceUpdate && !context.getters.shouldUpdate) return;

      const url = `${baseURL}/coaches.json`;
      const res = await axios.get(url);
      const coachesList = Object.entries(res.data).map(([id, data]) => ({
        id,
        ...data,
      }));
      context.commit('setCoaches', coachesList);
      context.commit('setLastFetched');
    },
    async loadCoachDetails(context, coachId) {
      const url = `${baseURL}/coaches/${coachId}.json`;
      const res = await axios.get(url);
      context.commit('setActiveCoach', res.data);
    },
  },
};
