import Link from 'next/link';
import { deleteFight } from '@/app/lib/actions';
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

export function UpdateFight({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/fights/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil />
    </Link>
  );
}

export function DeleteFight({ id }: { id: string }) {
  const deleteFightWithId = deleteFight.bind(null, id);

  return (
    <form action={deleteFightWithId}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <Trash2 />
      </button>
    </form>
  );
}
