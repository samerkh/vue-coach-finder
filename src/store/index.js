import { createStore } from 'vuex';
import authModule from './modules/auth.js';
import coachesModule from './modules/coaches.js';
import requestsModule from './modules/requests.js';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
  },
});

export default store;
