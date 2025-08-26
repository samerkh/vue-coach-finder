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
  },
  mutations: {
    setUser(state, payload) {
      state = payload;
    },
  },
  actions: {
    async auth(ctx, payload) {
      const action =
        payload.action == 'login' ? 'signInWithPassword' : 'signUp';
      const authUrl = `${url}:${action}?key=${apiKey}`;
      const res = await axios.post(authUrl, {
        ...payload.data,
        returnSecureToke: true,
      });
      ctx.commit('setUser', {
        token: res.data.idToken,
        userId: res.data.localId,
        tokenExpiration: res.data.expiresIn,
      });
    },
  },
};
