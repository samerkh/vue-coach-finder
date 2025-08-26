import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
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
      component: defineAsyncComponent(() =>
        import('./pages/coaches/CoachesList.vue')
      ),
    },
    {
      path: '/coaches/:id',
      component: defineAsyncComponent(() =>
        import('./pages/coaches/CoachDetails.vue')
      ),
      props: true,
      children: [
        {
          path: 'contact',
          component: defineAsyncComponent(() =>
            import('./pages/requests/ContactCoach.vue')
          ),
          props: true,
        },
      ],
    },
    {
      path: '/register',
      component: defineAsyncComponent(() =>
        import('./pages/coaches/CoachRegister.vue')
      ),
      meta: { requiresAuth: true, requiresNotCoach: false },
    },
    {
      path: '/requests',
      component: defineAsyncComponent(() =>
        import('./pages/requests/RequestsList.vue')
      ),
      meta: { requiresAuth: true, requiresCoach: true },
    },
    {
      path: '/auth',
      redirect: '/auth/login',
    },
    {
      path: '/auth/:mode(login|signup)',
      component: defineAsyncComponent(() =>
        import('./pages/auth/UserAuth.vue')
      ),
      meta: { requiresUnauth: true },
      props: true,
    },
    {
      path: '/:notFound(.*)',
      component: defineAsyncComponent(() => import('./pages/NotFound.vue')),
    },
  ],
});

router.beforeEach((to, _, next) => {
  const isLoggedIn = store.getters.isAuthenticated;
  const isCoach = store.getters['coaches/isCoach'];

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ path: '/auth/login', query: { redirect: to.fullPath } });
  } else if (to.meta.requiresUnauth && isLoggedIn) {
    next({ path: '/coaches' });
  } else if (to.meta.requiresCoach && !isCoach) {
    next({ path: '/register', query: { redirect: to.fullPath } });
  } else if (to.meta.requiresNotCoach && isCoach) {
    next({ path: '/requests' });
  } else {
    next();
  }
});

export default router;
