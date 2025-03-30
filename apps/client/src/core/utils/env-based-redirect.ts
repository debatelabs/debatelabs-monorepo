import logger from '~/core/utils/logger';

async function checkEnvAndRedirectTo(route: string) {
  if (typeof window !== 'undefined') {
    window.location.replace(route);
  } else {
    try {
      const { redirect } = await import('next/navigation');
      redirect(route);
    } catch (err) {
      logger.error('Redirect on server is not supported in this environment.');
      console.error(err);
    }
  }
}

export default checkEnvAndRedirectTo;
