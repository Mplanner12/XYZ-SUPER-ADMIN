import { jwtDecode } from 'jwt-decode';

const COOKIE_NAME = 'accessToken';
const COOKIE_OPTIONS = {
  path: '/',
  secure: true,
  sameSite: 'Strict',
  maxAge: 30 * 60,
};

type JwtPayload = {
  exp: number;
  [key: string]: any;
};

export const getAccessToken = (): string | null => {
  if (typeof document === 'undefined') return null;

  const cookieString = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${COOKIE_NAME}=`));
  const token = cookieString?.split('=')[1];

  if (!token) return null;

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (Date.now() >= exp * 1000) {
      removeAccessToken();
      return null;
    }
    return token;
  } catch {
    removeAccessToken();
    return null;
  }
};

export const setAccessToken = (token: string) => {
  if (typeof document === 'undefined') return;

  const expires = new Date(Date.now() + COOKIE_OPTIONS.maxAge * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${token}; path=${COOKIE_OPTIONS.path}; expires=${expires}; secure; SameSite=${COOKIE_OPTIONS.sameSite}`;
};

export const removeAccessToken = () => {
  if (typeof document === 'undefined') return;

  document.cookie = `${COOKIE_NAME}=; path=${COOKIE_OPTIONS.path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
