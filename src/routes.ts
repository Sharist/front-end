import Home from './pages/Home';
import Auth from './pages/auth/Auth';
import Plan from './pages/Plan';
import { navigate } from '@reach/router';

/**
 * Add to this object when you add a new route.
 */
const routes = {
  home: {
    pageComponent: Home,
    path: '/',
    navigator: () => navigate('/'),
  },
  signUp: {
    pageComponent: Auth,
    path: '/login',
    navigator: () => navigate('/login'),
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
};

export default routes;
