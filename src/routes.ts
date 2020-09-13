import { navigate } from '@reach/router';

import Auth from './pages/auth/Auth';
import Home from './pages/Home';
import Plan from './pages/Plan';
import SignOut from './pages/auth/SignOut';
import VerifyEmail from './pages/auth/VerifyEmail';

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
  signOut: {
    pageComponent: SignOut,
    path: '/signout',
    navigator: () => navigate('/signout'),
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
