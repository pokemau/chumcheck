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
const publicOnlyRoutes = ['/login', '/register', '/admin-login'];

export const handle: Handle = async ({ event, resolve }) => {
  let accessToken = event.cookies.get('Access');
  const pathname = event.url.pathname;

  // Treat protected route only if exact match or prefixed with '/'
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(route + '/')
  );
  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    pathname === route || pathname.startsWith(route + '/')
  );
  const isAdminLogin = pathname.startsWith('/admin-login');

  if (!accessToken) {
    if (isProtectedRoute) {
      // If admin area and not logged, go to admin-login; else normal login
      if (pathname.startsWith('/admin')) {
        throw redirect(302, `/admin-login?redirectTo=${encodeURIComponent(pathname)}`);
      }
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
      if (isAdminLogin) {
        // If already logged and role qualifies, go to admin; else redirect to startups
        if (event.locals.user.role === 'Manager' || event.locals.user.role === 'Manager as Mentor') {
          throw redirect(302, '/admin');
        }
        throw redirect(302, '/startups');
      }
      throw redirect(302, '/startups');
    }
  } catch (error) {
    console.error(`[ HANDLE ERROR ]`);
    console.error(error);
    if (isProtectedRoute) {
      if (pathname.startsWith('/admin')) {
        throw redirect(302, `/admin-login?redirectTo=${encodeURIComponent(pathname)}`);
      }
      throw redirect(302, `/login?redirectTo=${encodeURIComponent(pathname)}`);
    }

    return await resolve(event);
  }

  return await resolve(event);
};
