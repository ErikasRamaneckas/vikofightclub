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

      if (isOnDashboard) {
        if (isLoggedIn) return true;

        return false;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
