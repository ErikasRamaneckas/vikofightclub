import { Frown } from 'lucide-react';
import Link from 'next/link';

export default async function Unauthorized() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Frown />
      <h2 className="text-xl font-semibold">401 Unauthorized</h2>
      <p>You are NOT AUTHORIZED to view this page.</p>
      <Link
        href="/dashboard"
        className="mt-4 rounded-md bg-pink-500 px-4 py-2 text-sm text-white transition-colors hover:bg-pink-400"
      >
        Go Back
      </Link>
    </main>
  );
}
