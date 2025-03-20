import React from 'react';

export default function AuthFormContainer({ children }: { children: React.ReactNode }) {
  return <form>{children}</form>;
}
