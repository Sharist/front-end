import { useEffect, useState } from 'react';

import { get, getCookie } from '../http';
import routes from '../../routes';

const SIGNED_IN_STATUS_KEY = 'is-signed-in';

/**
 * Check signed in status from session cache without making a call to backend.
 */
function checkCachedSignedInStatus(): boolean | null {
  const statusStr =
    window.sessionStorage?.getItem(SIGNED_IN_STATUS_KEY) ?? getCookie(SIGNED_IN_STATUS_KEY);

  switch (statusStr) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
}

/**
 * Update session cache on user signed in information and clean up unnecessary items.
 *
 * @param status True indicating the user is signed in.
 */
function updateSignedInStatus(status: boolean) {
  if (window.sessionStorage) {
    window.sessionStorage.setItem(SIGNED_IN_STATUS_KEY, String(status));
  } else {
    document.cookie = `${SIGNED_IN_STATUS_KEY}=${status}`;
  }

  if (!status) {
    // Remove CSRF token if not signed in
    document.cookie = `csrf_token=; max-age=-1; path=/; domain=.sharist.localhost`;
  }
}

export type UseAuthConfig = {
  /**
   * If `true`, `useAuthentication` hook will redirect the user to the login page.
   * Defaults to `true`.
   */
  requestLogin: boolean;
};

const defaultConfig: UseAuthConfig = {
  requestLogin: true,
};

/**
 * Hook for checking if the current user is signed in.
 *
 * Returns an object containing:
 *  - `signedIn`: Boolean indicating if the user is signed in (can be from cache)
 *  - `refreshSignedInStatus`: Function making API call to backend to get latest status.
 *    Function returns a promise that resolves when refresh is complete.
 */
export function useAuthentication(config: UseAuthConfig = defaultConfig) {
  const [signedIn, setSignedIn] = useState(checkCachedSignedInStatus());

  const { requestLogin } = config;

  /**
   * Query backend to see if the current user is logged in.
   */
  async function refreshSignedInStatus() {
    try {
      const { status } = await get('signed-in');
      const signedInStatus = status === 200;

      updateSignedInStatus(signedInStatus);
      setSignedIn(signedInStatus);
    } catch (e) {
      updateSignedInStatus(false);
      setSignedIn(false);
    }
  }

  useEffect(() => {
    if (signedIn === null) {
      refreshSignedInStatus();
    } else if (!signedIn && requestLogin) {
      routes.logIn.navigator();
    }
  }, [signedIn]);

  return {
    signedIn,
    refreshSignedInStatus,
  };
}
