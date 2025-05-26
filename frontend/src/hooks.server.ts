import { PUBLIC_API_URL } from '$env/static/public';
import { JWT_SECRET } from '$env/static/private';
import { getRole } from '$lib/utils';
import type { Handle } from '@sveltejs/kit';
import { jwtVerify } from 'jose';
import { Play } from 'lucide-svelte';

const setUser = async (event: any, resolve: any, access: any) => {
  try {
    // const secret = new TextEncoder().encode(
    //   'django-insecure-vak*mz%99+#882*g*87x8$%!r=trnnqd)zh2)i$w51ra4cd&eg'
    // );

    const secret = new TextEncoder().encode(
      'django-insecure-vakmz%99+#882g*87x8$%!r=trnnqd)zh2)i$w51ra4cd&eg'
    );
    const { payload }: { payload: any } = await jwtVerify(access, secret);

    event.locals.user = {
      id: payload.user_id,
      role: getRole(payload.user_type) as
        | 'Manager'
        | 'Mentor'
        | 'Startup'
        | 'Manager as Mentor',
      email: payload.email,
      firstName: payload.first_name,
      lastName: payload.last_name
    };
  } catch (error) {
    return await resolve(event);
  }
};

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

    console.log(payload)

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
