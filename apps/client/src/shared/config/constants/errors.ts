const ERRORS = {
  unknown: 'Something went wrong :(',
  network: 'Network error',
  requestFailed: 'Request failed',
  cookieNotFound: (val: string) => `${val} cookie not found`,
  undefinedToken: 'Token is undefined'
};

export default ERRORS;
