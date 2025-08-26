const apiKey = '';
const url = `https://identitytoolkit.googleapis.com/v1/accounts`;
import axios from 'axios';

let timer;

export default {
  state() {
    return {
      userId: null,
      token: null,
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

      const expiresIn = +res.data.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(() => {
        ctx.dispatch('logout');
      }, expiresIn);

      ctx.commit('setUser', {
        token: res.data.idToken,
        userId: res.data.localId,
      });
      const coach = await ctx.dispatch(
        'coaches/getCoachDetails',
        res.data.localId
      );
      if (coach) {
        ctx.commit('coaches/setUserIsCoach', true);
      }

      localStorage.setItem('isCoach', coach);
    },
    async autoLogin(ctx) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const isCoach = localStorage.getItem('isCoach') ?? false;

      if (!token || !userId || !tokenExpiration) return;

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn <= 0) return;

      timer = setTimeout(() => {
        ctx.dispatch('logout');
      }, expiresIn);

      ctx.commit('setUser', {
        token,
        userId,
      });

      ctx.commit('coaches/setUserIsCoach', isCoach);
    },
    logout(ctx) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('isCoach');

      clearTimeout(timer);

      ctx.commit('setUser', {
        userId: null,
        token: null,
      });
      ctx.commit('coaches/setUserIsCoach', false);
    },
  },
};
