const apiKey = '';
const url = `https://identitytoolkit.googleapis.com/v1/accounts`;
const signupUrl = `${url}:signUp?key=${apiKey}`;
// const loginUrl = `${url}:signInWithPassword?key=${apiKey}`;
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
    async login() {},
    async signup(ctx, data) {
      const res = await axios.post(signupUrl, {
        ...data,
        returnSecureToke: true,
      });
      console.log(res.data);
      ctx.commit('setUser', {
        token: res.data.idToken,
        userId: res.data.localId,
        tokenExpiration: res.data.expiresIn,
      });
    },
  },
};
