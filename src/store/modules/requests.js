export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const { userId } = rootGetters;
      return state.requests.filter((req) => req.coachId == userId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length;
    },
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
  },
  actions: {
    contactCoach(context, payload) {
      const newRequest = {
        id: new Date().toISOString(),
        ...payload,
      };
      context.commit('addRequest', newRequest);
    },
  },
};
