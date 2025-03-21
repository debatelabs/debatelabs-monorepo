import React, { forwardRef } from 'react';

const AuthFormContainer = forwardRef<HTMLFormElement, { children: React.ReactNode }>(
  function AuthFormContainer({ children }, ref) {
    async function onSubmit(e) {
      e.preventDefault();
      console.log(true);
    }

    return (
      <form ref={ref} onSubmit={onSubmit}>
        {children}
      </form>
    );
  }
);

export default AuthFormContainer;
