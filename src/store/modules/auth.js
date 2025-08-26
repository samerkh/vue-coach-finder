const apiKey = '';
const url = `https://identitytoolkit.googleapis.com/v1/accounts`;
import axios from 'axios';

export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.tokenExpiration = payload.tokenExpiration;
    },
  },
  actions: {
    async auth(ctx, payload) {
      const action =
        payload.action == 'login' ? 'signInWithPassword' : 'signUp';
      const authUrl = `${url}:${action}?key=${apiKey}`;
      const res = await axios.post(authUrl, {
        ...payload.data,
        returnSecureToken: true,
      });
      ctx.commit('setUser', {
        token: res.data.idToken,
        userId: res.data.localId,
        tokenExpiration: res.data.expiresIn,
      });
    },
  },
};
