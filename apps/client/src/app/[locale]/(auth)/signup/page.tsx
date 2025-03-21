import React from 'react';
import { AuthContent, SignupForm } from '~/features/auth';

export default function Signup() {
  return (
    <AuthContent type='signup'>
      <SignupForm />
    </AuthContent>
  );
}
