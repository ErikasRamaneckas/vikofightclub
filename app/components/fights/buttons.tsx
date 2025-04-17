import Link from 'next/link';
import { Pencil, Plus, Trash2 } from 'lucide-react';

export function CreateFight() {
  return (
    <Link
      href="/dashboard/fights/create"
      className="flex h-10 items-center rounded-lg bg-pink-600 px-4 text-sm font-medium text-white transition-colors hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
    >
      <span className="hidden md:block">Create Fight </span> <Plus />
    </Link>
  );
}
