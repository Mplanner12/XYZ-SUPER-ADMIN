import { getAccessToken } from './token';

export const isUserLoggedIn = () => {
  const token = getAccessToken();
  return !!token;
};
