import { ComponentType } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';

import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import SignOut from './pages/auth/SignOut';
import TripEdit from './pages/trip/TripEdit';
import TripList from './pages/trip/TripList';
import VerifyEmail from './pages/auth/VerifyEmail';

interface RouteSpec {
  pageComponent: ComponentType<RouteComponentProps>;
  path: string;
  navigator: (param?: any) => Promise<void>;
}

interface RouteMap {
  [key: string]: RouteSpec;
}

function routeSpecOf(pageComponent: ComponentType<RouteComponentProps>, path: string): RouteSpec {
  return {
    pageComponent,
    path,
    navigator: (param = {}) => {
      const urlSegments = path
        .split('/')
        .map((segment) => (segment.startsWith(':') ? param[segment.substr(1)] : segment));

      return navigate(urlSegments.join('/'));
    },
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
  tripList: routeSpecOf(TripList, '/trips'),
  tripEdit: routeSpecOf(TripEdit, '/trips/:tripId/edit'),
  signOut: routeSpecOf(SignOut, '/signout'),
  signUp: routeSpecOf(Auth, '/signup'),
  verifyEmail: routeSpecOf(VerifyEmail, '/verify-email'),
};

export default routes;
