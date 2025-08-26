import { createRouter, createWebHistory } from 'vue-router';
import UserAuth from './pages/auth/UserAuth.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import NotFound from './pages/NotFound.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsList from './pages/requests/RequestsList.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
          props: true,
        },
      ],
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requiresAuth: true, requiresNotCoach: false },
    },
    {
      path: '/requests',
      component: RequestsList,
      meta: { requiresAuth: true, requiresCoach: true },
    },
    {
      path: '/auth',
      redirect: '/auth/login',
    },
    {
      path: '/auth/:mode(login|signup)',
      component: UserAuth,
      meta: { requiresUnauth: true },
      props: true,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, _, next) => {
  const isLoggedIn = store.getters.isAuthenticated;
  const isCoach = store.getters['coaches/isCoach'];
  console.log({ isLoggedIn, isCoach });

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/auth/login');
  } else if (to.meta.requiresUnauth && isLoggedIn) {
    next('/coaches');
  } else if (to.meta.requiresCoach && !isCoach) {
    next('/coaches');
  } else if (to.meta.requiresNotCoach && isCoach) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
