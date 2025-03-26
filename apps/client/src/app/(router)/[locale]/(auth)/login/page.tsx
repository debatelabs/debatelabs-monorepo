import React from 'react';
import { AuthContent, LoginForm } from '~/features/auth';

export default function Login() {
  return (
    <AuthContent type='login'>
      <LoginForm />
    </AuthContent>
  );
}
