import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
    signOut: '/',
  },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const pathname = request.nextUrl.pathname;

      const isOnDashboard = pathname.startsWith('/dashboard');
      const isOnRoot = pathname === '/';

      if (isOnDashboard) {
        if (isLoggedIn) return true;

        return false;
      }

      if (isOnRoot && isLoggedIn) {
        return Response.redirect(
          new URL('/dashboard', request.nextUrl)
        );
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
