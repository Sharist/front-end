import { navigate } from '@reach/router';

import Auth from './pages/auth/Auth';
import Home from './pages/Home';
import Plan from './pages/Plan';

/**
 * Add to this object when you add a new route.
 *
 * Sort by alphabetical order.
 */
const routes = {
  home: {
    pageComponent: Home,
    path: '/',
    navigator: () => navigate('/'),
  },
  logIn: {
    pageComponent: Auth,
    path: '/signup',
    navigator: () => navigate('/signup'),
  },
  plan: {
    pageComponent: Plan,
    path: '/plan',
    navigator: () => navigate('/plan'),
  },
  signUp: {
    pageComponent: Auth,
    path: '/login',
    navigator: () => navigate('/login'),
  },
};

export default routes;
