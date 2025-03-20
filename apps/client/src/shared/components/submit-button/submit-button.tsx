import React from 'react';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function SubmitButton({ children, ...props }: SubmitButtonProps) {
  return (
    <button
      type='submit'
      {...props}
      className={`rounded-full bg-primary text-secondary px-6 h-10 ${props?.className || ''}`}
    >
      {children}
    </button>
  );
}
