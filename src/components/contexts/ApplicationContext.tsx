import React, { ReactChild, useEffect, useState } from 'react';

import { get } from '../../common/http';

type RefreshableState = 'isSignedIn';

const ApplicationContext = React.createContext({
  states: {
    isSignedIn: false,
  },
  refreshStates: (...states: RefreshableState[]) => Promise.resolve({}),
});

function ApplicationContextProvider({ children }: { children?: ReactChild }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const refreshers = {
    isSignedIn: () =>
      get('signed-in')
        .then((res) => setIsSignedIn(res.status === 200))
        .catch(() => setIsSignedIn(false)),
  };

  async function refreshStates(...statesToRefresh: RefreshableState[]) {
    return Promise.all(statesToRefresh.map((toRefresh) => refreshers[toRefresh]()));
  }

  useEffect(() => {
    Object.values(refreshers).forEach((func) => func());
  }, [refreshers]);

  return (
    <ApplicationContext.Provider
      value={{
        states: { isSignedIn },
        refreshStates,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export default ApplicationContext;

export { ApplicationContextProvider };
