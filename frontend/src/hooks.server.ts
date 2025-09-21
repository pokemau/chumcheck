import { JWT_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { jwtVerify } from 'jose';
import { redirect } from '@sveltejs/kit';

const protectedRoutes = [
  '/account',
  '/analytics',
  '/applications',
  '/startups',
  '/admin'
];
const publicOnlyRoutes = ['/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
  let accessToken = event.cookies.get('Access');
  const pathname = event.url.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (isProtectedRoute) {
      throw redirect(302, `/login?redirectTo=${encodeURIComponent(pathname)}`);
    }
    return await resolve(event);
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);

    const { payload } = await jwtVerify<{
      sub: string;
      email: string;
      role?: 'Startup' | 'Mentor' | 'Manager' | 'Manager as Mentor';
      firstName?: string;
      lastName?: string;
    }>(accessToken, secret);

    event.locals.user = {
      id: Number(payload.sub),
      email: payload.email,
      role: payload.role!,
      firstName: payload.firstName ?? undefined,
      lastName: payload.lastName ?? undefined
    };

    if (isPublicOnlyRoute) {
      throw redirect(302, '/startups');
    }
  } catch (error) {
    console.error(`[ HANDLE ERROR ]`);
    console.error(error);
    if (isProtectedRoute) {
      throw redirect(302, `/login?redirectTo=${encodeURIComponent(pathname)}`);
    }

    return await resolve(event);
  }

  return await resolve(event);
};
