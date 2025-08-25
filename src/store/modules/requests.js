import axios from 'axios';

const baseURL =
  'https://find-coach-3000-default-rtdb.europe-west1.firebasedatabase.app';

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  getters: {
    requests(state) {
      return state.requests;
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length;
    },
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async loadRequests(context) {
      const { userId } = context.rootGetters;
      const url = `${baseURL}/coaches/${userId}/requests.json`;
      const res = await axios.get(url);

      const requests = Object.entries(res.data ?? []).map(([id, data]) => ({
        id,
        ...data,
      }));
      context.commit('setRequests', requests);
    },
    async contactCoach(context, payload) {
      const { coachId } = payload;
      const requestData = {
        email: payload.email,
        message: payload.message,
      };
      const url = `${baseURL}/coaches/${coachId}/requests.json`;
      const res = await axios.post(url, requestData);
      requestData.id = res.data.name;
      context.commit('addRequest', requestData);
    },
  },
};
