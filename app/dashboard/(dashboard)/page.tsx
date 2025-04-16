import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  return <h1>Welcome to the Fight Club</h1>;
}
