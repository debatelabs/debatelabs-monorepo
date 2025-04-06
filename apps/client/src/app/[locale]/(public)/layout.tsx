import React from 'react';
import Footer from '~/widgets/footer/Footer';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='px-public-page'>{children}</main>
      <Footer />
    </>
  );
}

export default PublicLayout;
