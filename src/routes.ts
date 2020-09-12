import { navigate } from '@reach/router';

import Auth from './pages/auth/Auth';
import VerifyEmail from './pages/auth/VerifyEmail';
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
    path: '/login',
    navigator: () => navigate('/login'),
  },
  plan: {
    pageComponent: Plan,
    path: '/plan',
    navigator: () => navigate('/plan'),
  },
  signUp: {
    pageComponent: Auth,
    path: '/signup',
    navigator: () => navigate('/signup'),
  },
  verifyEmail: {
    pageComponent: VerifyEmail,
    path: '/verify-email',
    // We don't want things to navigate to this route
    navigator: () => navigate('/'),
  },
};

export default routes;
