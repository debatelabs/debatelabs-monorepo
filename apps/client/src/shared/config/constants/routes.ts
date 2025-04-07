export const AUTH_ROUTES = {
  login: '/login',
  signup: '/signup'
};

export const PUBLIC_ROUTES = {
  about: '/about',
  contacts: '/contacts',
  sponsorship: '/sponsorship'
};

const PROTECTED_ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  settings: '/settings'
};

const ROUTES = {
  ...AUTH_ROUTES,
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES
};

export default ROUTES;
