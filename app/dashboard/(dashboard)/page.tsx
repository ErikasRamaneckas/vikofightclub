import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    return (
      <p>
        Logged in as: {session?.user?.name}, role:
        {session?.user?.role}
      </p>
    );
  }
}
