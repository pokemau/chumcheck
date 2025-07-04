import { JWT_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { jwtVerify } from 'jose';

export const handle: Handle = async ({ event, resolve }) => {
  let accessToken = event.cookies.get('Access');

  if (!accessToken) return await resolve(event);

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
  } catch (error) {
    console.error(`[ HANDLE ERROR ]`);
    console.error(error);
    return await resolve(event);
  }

  return await resolve(event);
};
