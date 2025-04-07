import React from 'react';
import Footer from '~/widgets/footer';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='px-public-page min-h-screen'>{children}</main>
      <Footer />
    </>
  );
}

export default PublicLayout;
