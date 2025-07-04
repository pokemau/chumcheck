import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { User } from './lib/types';
import { Role } from './lib/enums';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('Access')?.value;

  if (!accessToken) {
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jwtVerify<{
      sub: string;
      email: string;
      role: Role;
      firstName: string;
      lastName: string;
    }>(accessToken, secret);

    const user: User = {
      id: Number(payload.sub),
      email: payload.email,
      role: payload.role!,
      firstName: payload.firstName,
      lastName: payload.lastName
    };

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-data', JSON.stringify(user));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
