import React from 'react';
import Link from 'next/link';

export default function TextLink({
  href,
  children,
  className
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`hover:underline underline-offset-8 text-dimmedText hover:text-secondary ${className || ''}`}
    >
      {children}
    </Link>
  );
}
