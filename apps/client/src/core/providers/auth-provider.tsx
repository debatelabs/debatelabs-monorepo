import React, { useEffect } from 'react';

function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // TODO: get user data (that was decoded from accessToken) from cookie
    //  and set it to redux slice with isAuthorized property
  }, []);

  return children;
}

export default AuthProvider;
