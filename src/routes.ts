import { ComponentType } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';

import Auth from './pages/auth/Auth';
import Home from './pages/Home';
import Plan from './pages/Plan';
import SignOut from './pages/auth/SignOut';
import VerifyEmail from './pages/auth/VerifyEmail';

interface RouteSpec {
  pageComponent: ComponentType<RouteComponentProps>;
  path: string;
  navigator: () => Promise<void>;
}

interface RouteMap {
  [key: string]: RouteSpec;
}

function routeSpecOf(pageComponent: ComponentType<RouteComponentProps>, path: string): RouteSpec {
  return {
    pageComponent,
    path,
    navigator: (redirectTo?: RouteSpec) =>
      navigate(redirectTo?.path ? `${path}?redirect=${encodeURIComponent(redirectTo.path)}` : path),
  };
}

/**
 * Add to this object when you add a new route.
 *
 * Sort by alphabetical order.
 */
const routes: RouteMap = {
  home: routeSpecOf(Home, '/'),
  logIn: routeSpecOf(Auth, '/login'),
  plan: routeSpecOf(Plan, '/plan'),
  signOut: routeSpecOf(SignOut, 'singout'),
  signUp: routeSpecOf(Auth, 'signup'),
  verifyEmail: routeSpecOf(VerifyEmail, 'verify-email'),
};

export default routes;
